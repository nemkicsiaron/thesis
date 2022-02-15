import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const allCat = await prisma.category.findMany();
    console.log(JSON.stringify(allCat));
}

main()
    .catch(e => { throw e })
    .finally(async () => await prisma.$disconnect())