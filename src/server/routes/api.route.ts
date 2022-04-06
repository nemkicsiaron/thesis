import { Router } from "express";
import { aggregatorUri } from "../util/config";
import listallcat from "../functions/listallcat";
import discovery from "../functions/discovery";

const router = Router();

router.get('/', (_, res) => {
    return res.json("Lajos");
});

router.get('/allcat', (_, res) => {
    try {
        const allCats = listallcat();
        res.json(allCats);
    } catch (error) {
        console.error(error);
    }
});

router.get('/probe', (_, res) => {
    const allok: boolean = true;
    if(allok) {
        res.status(200).json({
            message: "Server available",
        });
    }
});

router.post('/discovery', async (req, res) => {
    const discoveryaddr = (req.body.address || aggregatorUri);
    if(await discovery(discoveryaddr)) {
        res.status(200).json("Successful discovery");
    } else {
        res.status(500).json("There was a problem with discovery process!");
    }
});

router.get('/find', () => {

});

export default router;