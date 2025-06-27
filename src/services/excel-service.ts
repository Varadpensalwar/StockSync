import ExcelJS from 'exceljs';
import { Product } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

// Threshold for low stock
const LOW_STOCK_THRESHOLD = 10;

export async function generateProductReport(products: Product[], filePath: string): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Products');

  // Add headers
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Stock', key: 'stock', width: 10 },
    { header: 'Price', key: 'price', width: 15 },
    { header: 'Supplier', key: 'supplier', width: 25 },
  ];

  // Format header row
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Add product rows
  products.forEach((product) => {
    const row = sheet.addRow({
      id: product.id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      supplier: (product as any).supplierName || '', // If joined
    });
    // Highlight low stock
    if (product.stock <= LOW_STOCK_THRESHOLD) {
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFC7CE' }, // light red
        };
      });
    }
  });

  await workbook.xlsx.writeFile(filePath);
}

export async function sendExcelReport(bot: TelegramBot, chatId: number, filePath: string, caption = 'Product Report'): Promise<void> {
  await bot.sendDocument(chatId, fs.createReadStream(filePath), {}, { filename: 'product-report.xlsx', contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // Optionally delete the file after sending
  fs.unlink(filePath, () => {});
} 