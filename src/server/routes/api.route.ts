import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { nextTick } from "process";

const prisma = new PrismaClient();
const router = Router();

router.get('/', (req, res) => {
    return res.json("Lajos");
});

router.get('/allcat', async (req, res) => {
    try {
        const allCats = await prisma.category.findMany();
        res.json(allCats);
    } catch (error) {
        console.error(error);
    }
});

export default router;