import dotenv from 'dotenv';
dotenv.config();

import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';
import {
  createProduct,
  getProductByName,
  getStockByProduct,
  deleteProductByName,
} from '../database/product-service';

// Initialize OpenAI chat model
const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  modelName: 'gpt-4.1-nano',
});

const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY! });
const vectorStore = new MemoryVectorStore(embeddings);

// --- INTENT & PARAMETER EXTRACTION ---

function parseAddProduct(message: string) {
  // Example: "Add 50 iPhone 15s price 80000 from Apple"
  const regex = /add\s+(\d+)\s+([\w\s\d\-\+]+?)s?\s+price\s+(\d+(?:\.\d+)?)\s+from\s+([\w\s\d\-\+]+)/i;
  const match = message.match(regex);
  if (match) {
    return {
      stock: parseInt(match[1], 10),
      name: match[2].trim(),
      price: parseFloat(match[3]),
      supplierName: match[4].trim(),
      supplierContact: '', // Not provided in message
    };
  }
  return null;
}

function parseGetStock(message: string) {
  // Example: "What's the stock of iPhone?"
  const regex = /stock(?:\s+of)?\s+([\w\s\d\-\+]+)/i;
  const match = message.match(regex);
  if (match) {
    return { name: match[1].replace(/\?$/, '').trim() };
  }
  return null;
}

function parseDeleteProduct(message: string) {
  // Example: "Delete iPhone 12"
  const regex = /delete\s+([\w\s\d\-\+]+)/i;
  const match = message.match(regex);
  if (match) {
    return { name: match[1].trim() };
  }
  return null;
}

async function routeIntent(message: string): Promise<string> {
  // Try add product
  const addParams = parseAddProduct(message);
  if (addParams) {
    const product = await createProduct(addParams);
    return `Product '${product.name}' added with stock ${product.stock}, price $${product.price}, supplier ${addParams.supplierName}.`;
  }

  // Try get stock
  const stockParams = parseGetStock(message);
  if (stockParams) {
    const stock = await getStockByProduct(stockParams.name);
    if (stock !== null) {
      return `Stock for ${stockParams.name}: ${stock}`;
    } else {
      return `Product '${stockParams.name}' not found.`;
    }
  }

  // Try delete product
  const deleteParams = parseDeleteProduct(message);
  if (deleteParams) {
    try {
      await deleteProductByName(deleteParams.name);
      return `Product '${deleteParams.name}' deleted.`;
    } catch {
      return `Product '${deleteParams.name}' not found or could not be deleted.`;
    }
  }

  // Fallback to QA
  const qaChain = RetrievalQAChain.fromLLM(chat, vectorStore.asRetriever());
  const result = await qaChain.call({ query: message });
  return typeof result === 'string' ? result : JSON.stringify(result);
}

export const agent = {
  call: routeIntent,
};

// Example usage
// (async () => {
//   const response = await agent.call('How many Widget do we have?');
//   console.log(response);
// })(); 