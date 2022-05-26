import { Router } from "express";
import calculateBetweenDates from "../functions/betweendates";
import listallcat from "../functions/listallcat";
import { indexer, serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import generalquery from "../crud/generalquery";
import servercatquery from "../crud/servercatquery";
import deletepost from "../crud/deletepost";
import listallposts from "../functions/listallposts";
import updatepost from "../crud/updatepost";
import createpost from "../crud/createpost";
import APIReturn from "../interfaces/return";

const aggregrouter = Router();

aggregrouter.get('/', (_, res) => {
    return res.json("Szia Dominik");
});

aggregrouter.get('/alldb', (_, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(serverslist());
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


aggregrouter.get('/allcat', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const server = req.query.server?.toString();
        res.json(await listallcat(server));
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

aggregrouter.get('/allposts', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const server = req.query.server?.toString().trim() ?? "";
        //console.log("Server:", server);
        var allposts: APIReturn = await listallposts(server);
        if(allposts) {
            res.status(200).json(allposts);
        }
        else {
            res.status(500).json("There was a problem with the request!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

aggregrouter.post('/discover', (req, res) => {
    try {
        res.json(indexer(req.body.address, req.body.cat));
    } catch (error) {
        console.error(error);
    }
});


aggregrouter.get('/findpost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const category = (req.query.category ?? "").toString();
    const searchterm = (req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();
    const signature = (req.query.signature ?? "").toString();

    console.log(new Date(), "Searching for:", searchterm, category, minprice, maxprice, signature);

    if(category) {
        try {
            console.log("Category query");
            const postsres = await servercatquery(searchterm, category, minprice, maxprice, "", signature);
            if(postsres.error) res.status(500).json(postsres.message);
            else {
                console.log("Done:", postsres.posts);
                res.status(200).json(postsres);
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json(error.message);
        }
    } else {
        console.log("General query");
        const postsres = await generalquery(searchterm, minprice, maxprice, "", signature);
        if(postsres.error) res.status(500).json(postsres.message);
        else {
            console.log("Done:", postsres.posts);
            res.status(200).json(postsres);
        }
    }
});

aggregrouter.get('/findownpost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const category = (req.query.category ?? "").toString();
    const searchterm =(req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? " ").toString();
    const maxprice = (req.query.maxprice ?? " ").toString();
    const author = (req.query.author ?? "").toString();
    const signature = (req.query.signature ?? "").toString();

    console.log(new Date(), "Searching for own posts:", searchterm, category, minprice, maxprice, "by", author);

    const postsres = await generalquery(searchterm, minprice, maxprice, author, signature);
    if(postsres.error) res.status(500).json(postsres.message);
    else {
        console.log("Done:", postsres.posts);
        res.status(200).json(postsres);
    }
});

aggregrouter.post('/newpost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await req.body;
    var serveraddr: string = data.server?.toString();
    if(!serveraddr) serveraddr = serverslist().find(s => calculateBetweenDates(s.lastactive, new Date()) < 15 && s.address === serveraddr)?.address ?? "";
    //console.log(serveraddr);
    const newpost: Post = data.post;
    if(!newpost || !('signature'in newpost)){
        res.status(400).json("Invalid post");
        return;
    }
    const createres = await createpost(newpost, serveraddr);
    if(createres.error) res.status(500).json(createres.message);
    else {
        console.log("Done:", createres.posts);
        res.status(200).json(createres);
    }
});

aggregrouter.delete('/deletepost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await req.body.post;
    const deletedpost: Post = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        created: new Date(data.created),
        signature: data.signature,
        author: data.author,
        published: data.published
    };

    if(!deletedpost || !('signature'in deletedpost)){
        res.status(400).json("Invalid post");
        return;
    }

    try {
        const deleteres = await deletepost(deletedpost);
        //console.log(success);
        if(!deleteres.error) res.status(200).json(deleteres);
        else res.status(500).json("There was an error deleting the post: " + deleteres.message);
    } catch(error: any) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

aggregrouter.put('/updatepost', async (req, res) => {
    //console.log(req.body);
    const data = await req.body;
    var serveraddr: string = data.server?.toString();
    if(!serveraddr) serveraddr = serverslist().find(s => calculateBetweenDates(s.lastactive, new Date()) < 15 && s.address === serveraddr)?.address ?? "";
    const newpost: Post = data.post;
    //console.log(newpost);
    if(!newpost || !('signature'in newpost)){
        res.status(400).json("Invalid post");
        return;
    }
    const oldsignature: string = data.oldsignature;
    if(!oldsignature.trim()) {
        res.status(400).json("Invalid old signature");
        return;
    }
    try {
        const success = await updatepost(newpost, oldsignature, serveraddr);
        if(!success.error) res.status(200).json(success);
        else res.status(500).json("There was an error updating the post: " + success.message);
    } catch(error: any) {
        console.error(error);
        res.status(500).json(error.message);
    }

});

export default aggregrouter;