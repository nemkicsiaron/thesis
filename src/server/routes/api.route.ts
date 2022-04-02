import { Router } from "express";
import { aggregatorUri } from "../util/config";
import listallcat from "../functions/listallcat";
import discovery from "../functions/discovery";

const router = Router();

router.get('/', (req, res) => {
    return res.json("Lajos");
});

router.get('/allcat', (req, res) => {
    try {
        const allCats = listallcat();
        res.json(allCats);
    } catch (error) {
        console.error(error);
    }
});

router.get('/probe', (req, res) => {
    const allok: boolean = true;
    if(allok) {
        res.status(200).json({
            message: "Server available",
        });
    }
});

router.post('/discovery', (req, res) => {
    const discoveryaddr = (req.body.address || aggregatorUri);
    discovery(discoveryaddr)
});

export default router;