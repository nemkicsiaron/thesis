import { Router } from "express";
import { listallcat } from "../functions/listallcat";

const router = Router();

router.get('/', (req, res) => {
    return res.json("Lajos");
});

router.get('/allcat', async (req, res) => {
    try {
        const allCats = listallcat();
        res.json(allCats);
    } catch (error) {
        console.error(error);
    }
});

export default router;