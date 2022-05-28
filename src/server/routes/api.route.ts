import { Router } from "express";
import { aggregatorUri, ownUri } from "../util/config";
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

router.get('/allcat', async (_, res) => {
    try {
        const allCats = await listallcat();
        console.log(new Date(), ":", allCats)
        res.json(allCats);
    } catch (error) {
        console.error(error);
    }
});
/*
router.get('/allposts', async (_, res) => {
    console.log("allposts");
    try {
        const allPosts = await findpost("","","");
        console.log(new Date() + ":" + allPosts);
        res.status(200).json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});*/

router.get('/restart', (_, res) => {
    setTimeout(() => discovery(aggregatorUri, ownUri), 5 * 1000);
    res.json("Acknowledged Aggregator restart");
})

router.get('/probe', (_, res) => {
    listallcat().then((allcats) => {
        res.status(200).json({
            message: "Server available",
            categories: JSON.stringify(allcats),
        });
    }).catch((error) => {
        console.error(error);
        res.status(500).json(error);
    });
});

router.post('/discovery', async (req, res) => {
    const discoveryaddr = (req.body.address || aggregatorUri);
    const allcats = await listallcat();
    if(await discovery(discoveryaddr, ownUri)) {
        res.status(200).json({
            message: "Server available",
            categories: JSON.stringify(allcats),
        });
    } else {
        res.status(500).json("There was a problem with discovery process!");
    }
});

router.get('/findpost', async (req, res) => {

    const searchterm = (req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();
    const signature = (req.query.signature ?? "").toString();

    console.log(new Date(), "Search for:", searchterm, minprice, maxprice, signature);

    try {
        const posts = await findpost(searchterm, minprice, maxprice, "", signature);
        // console.log(new Date(), ":", posts);
        if(posts.error) res.status(500).json("There was a problem with finding own post: " + posts.message);
        else res.status(200).json(posts.posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/findownpost', async (req, res) => {

    const searchterm = (req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();
    const author = (req.query.author ?? "").toString();
    const signature = (req.query.signature ?? "").toString();

    console.log(new Date(), "Search for own post:", searchterm, minprice, maxprice, "by", author);

    try {
        const posts = await findpost(searchterm, minprice, maxprice, author, signature);
        console.log(new Date(), ":", posts.posts);
        if(posts.error) res.status(500).json("There was a problem with finding own post: " + posts.message);
        else res.status(200).json(posts.posts);
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
    if(!createres.error) res.status(200).json(createres);
    else res.status(500).json("There was a problem with creating the post: " + createres.message);
});

router.delete('/deletepost', async (req, res) => {
    const post = await req.body;
    console.log(post);
    if (post && !('signature' in post)) {
        res.status(401).json("No signature provided!");
        return;
    }
    const deleteres = await deletepost(post.title, post.author, post.signature);
    if(!deleteres.error) res.status(200).json(deleteres);
    else res.status(500).json("There was a problem with deleting the post: " + deleteres.message);
});

router.put('/updatepost', async (req, res) => {
    const data = await req.body;
    console.log(data)
    const updateres = await updatepost(data.post, data.oldsignature);
    console.log(updateres);
    if(!updateres.error) res.status(200).json(updateres);
    else res.status(500).json("There was a problem with updating the post: " + updateres.message);
});

export default router;