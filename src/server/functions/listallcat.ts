import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listallcat(): Promise<Category[]> {
    var allCats: Category[] = []
    try {
       allCats = await prisma.category.findMany();
    } catch (error) {
        console.error(error);
    }
    finally {
        return allCats
    }
}