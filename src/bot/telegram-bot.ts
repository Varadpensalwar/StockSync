import dotenv from 'dotenv';
dotenv.config();

import TelegramBot from 'node-telegram-bot-api';
import { agent } from '../ai/langgraph-agent';
import type { Message } from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables');
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg: Message) => {
  bot.sendMessage(msg.chat.id, 'Welcome to StockSync! Send me a product question or use /help.');
});

bot.onText(/\/help/, (msg: Message) => {
  bot.sendMessage(msg.chat.id, 'You can ask about product stock, add new products, or ask general questions.');
});

bot.on('message', async (msg: Message) => {
  // Ignore commands handled above
  if (msg.text && (msg.text.startsWith('/start') || msg.text.startsWith('/help'))) return;
  if (!msg.text) return;

  try {
    const response = await agent.call(msg.text);
    bot.sendMessage(msg.chat.id, typeof response === 'string' ? response : JSON.stringify(response));
  } catch (err) {
    bot.sendMessage(msg.chat.id, 'Sorry, there was an error processing your request.');
    console.error(err);
  }
}); 