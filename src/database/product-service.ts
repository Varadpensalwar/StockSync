import { PrismaClient, Product, Supplier } from '@prisma/client';

const prisma = new PrismaClient();

export async function createProduct({ name, stock, price, supplierName, supplierContact }: {
  name: string;
  stock: number;
  price: number;
  supplierName: string;
  supplierContact: string;
}): Promise<Product> {
  // Find or create supplier
  let supplier = await prisma.supplier.findUnique({ where: { name: supplierName } });
  if (!supplier) {
    supplier = await prisma.supplier.create({ data: { name: supplierName, contact: supplierContact } });
  }
  // Create product
  return prisma.product.create({
    data: {
      name,
      stock,
      price,
      supplier: { connect: { id: supplier.id } },
    },
  });
}

export async function getProductByName(name: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { name } });
}

export async function getStockByProduct(name: string): Promise<number | null> {
  const product = await prisma.product.findUnique({ where: { name } });
  return product ? product.stock : null;
}

export async function deleteProductByName(name: string): Promise<Product | null> {
  return prisma.product.delete({ where: { name } });
} 