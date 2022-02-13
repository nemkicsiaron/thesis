import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { PrismaClient } from "@prisma/client"

const prisma: PrismaClient = new PrismaClient();

async function createTestDB() {
    await prisma.user.create({
        data: {

        }
    });
};

function search() {

};

async function main() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
};

main()
.catch((e) => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect();
});