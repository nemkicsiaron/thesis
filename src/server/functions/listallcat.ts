import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function listallcat(): Promise<Category[]> {
    var allCats: Category[] = []
    try {
       allCats = await prisma.category.findMany();
    //    console.log(allCats);
    } catch (error) {
        console.error(error);
    }
    finally {
        //console.error("All cats: " + JSON.stringify(allCats));
        return allCats;
    }
}