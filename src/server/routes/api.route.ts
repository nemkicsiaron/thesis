import { Router } from "express";
import { aggregatorUri } from "../util/config";
import listallcat from "../functions/listallcat";
import discovery from "../functions/discovery";
import findpost from "../functions/findpost";
import newpost from "../functions/newpost";
import deletepost from "../functions/deletepost";
import updatepost from "../functions/updatepost";

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

router.get('/findpost', async (req, res) => {

    const searchterm = (req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();

    console.log(new Date(), ":", searchterm, minprice, maxprice);

    try {
        const posts = await findpost(searchterm, minprice, maxprice);
        console.log(new Date(), ":", posts);
        res.status(200).json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


router.get('/filterbycategory', async (req, res) => {
    const category = req.query.category?.toString();
    console.log("Searching for category: " + category);
    const allCats = await listallcat();
    const cat = allCats.find(c => c.name === category);
    if(cat) {
        console.log("Category found: " + cat.name);
        res.status(200).json(true);
    } else {
        res.status(404).json("Category not found");
    }
});

router.post('/newpost', async (req, res) => {
    const post = await req.body;
    console.log(post);

    const createres = await newpost(post);
    if(createres) res.status(200).json(createres);
    else res.status(500).json("There was a problem with creating the post!");
});

router.delete('/deletepost', async (req, res) => {
    const data = await req.body;
    const deleteres = await deletepost(data.title, data.author, data.signature);
    if(deleteres.status === "success") res.status(200).json(deleteres.message);
    else res.status(500).json("There was a problem with deleting the post!");
});

router.put('updatepost', async (req, res) => {
    const data = await req.body;

    const updateres = await updatepost(data.updatepost, data.oldsignature);
    if(updateres.status === "success") res.status(200).json(updateres.message);
    else res.status(500).json("There was a problem with updating the post!");
});

export default router;