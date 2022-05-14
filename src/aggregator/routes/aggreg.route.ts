import { Router } from "express";
import calculateBetweenDates from "../functions/betweendates";
import listallcat from "../functions/listallcat";
import { indexer, serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import generalquery from "../crud/generalquery";
import servercatquery from "../crud/servercatquery";

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

aggregrouter.get('/allposts', async (_, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(await generalquery(""));
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
    const searchterm =(req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();

    console.log(new Date(), "Searching for:", searchterm, category, minprice, maxprice);

    if(category) {
        try {
            console.log("Category query");
            const postsres = await servercatquery(searchterm, category, Number(minprice), Number(maxprice));
            if(postsres.error) res.status(500).json(postsres.message);
            else {
                console.log("Done:", postsres.posts);
                res.status(200).json(postsres.posts);
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json(error.message);
        }
    } else {
        console.log("General query");
        const postsres = await generalquery(searchterm, Number(minprice), Number(maxprice));
        if(postsres.error) res.status(500).json(postsres.message);
        else {
            console.log("Done:", postsres.posts);
            res.status(200).json(postsres.posts);
        }
    }
});

aggregrouter.get('/findownpost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const category = (req.query.category ?? "").toString();
    const searchterm =(req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();
    const author = (req.query.author ?? "").toString();

    console.log(new Date(), "Searching for own posts:", searchterm, category, minprice, maxprice, "by", author);

    const postsres = await generalquery(searchterm, Number(minprice), Number(maxprice), author);
    if(postsres.error) res.status(500).json(postsres.message);
    else {
        console.log("Done:", postsres.posts);
        res.status(200).json(postsres.posts);
    }
});

aggregrouter.post('/newpost', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await req.body;
    var serveraddr: string = data.server?.toString();
    if(!serveraddr) serveraddr = serverslist().find(s => calculateBetweenDates(s.lastactive, new Date()) < 15)?.address ?? "";
    //console.log(serveraddr);
    const newpost: Post = data.post;

    const createres = await fetch(serveraddr + "/api/newpost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(newpost)
    });

    res.status(200).json(await createres.json());
});

aggregrouter.delete('/deletepost', async (req, res) => {
    const data = await req.body;
    const newpost: Post = {
        title : data.post.title,
        category: data.post.category,
        published: data.post.published,
        price: data.post.price,
        author: data.post.author,
        signature: data.post.signature,
        description: data.post.description,
        created: data.post.created,
    };

    console.log(data.post.publish);

    try {
        const deleteres = await fetch(data.server?.toString() + "/api/deletepost", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(newpost)
        });
        res.status(200).json(await deleteres.json());
    } catch(error: any) {
        console.error(error);
        res.status(404).json(error.message);
    }
});

aggregrouter.put('/updatepost', async (req, res) => {
    console.log(req.body);
});

export default aggregrouter;