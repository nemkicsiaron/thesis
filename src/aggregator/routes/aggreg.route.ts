import { Router } from "express";
import calculateBetweenDates from "../functions/betweendates";
import listallcat from "../functions/listallcat";
import { indexer, serverslist } from "../indexing/indexer";
import Category from "../interfaces/category";
import Post from "../interfaces/post";
import generalquery from "../crud/generalquery";
import servercatquery from "../crud/servercatquery";

const aggregrouter = Router();

aggregrouter.get('/', (req, res) => {
    return res.json("Lajos");
});

aggregrouter.get('/alldb', (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(serverslist());
    } catch (error) {
        console.error(error);
    }
});

aggregrouter.get('/allcat', (req, res) => {
});

aggregrouter.get('/allcat/:server', (req, res) => {
});


aggregrouter.post('/discover', (req, res) => {
    try {
        res.json(indexer(req.body.address, req.body.cat));
    } catch (error) {
        console.error(error);
    }
});


aggregrouter.get('/findpost', async (req, res) => {
    const category = (req.query.category ?? "").toString();
    const searchterm =(req.query.searchterm ?? "").toString();
    const minprice = (req.query.minprice ?? "").toString();
    const maxprice = (req.query.maxprice ?? "").toString();

    console.log(new Date(), "Searching for:", searchterm, category, minprice, maxprice);

    if(category) {
        try {
            console.log("Category query");
            const posts = await servercatquery(searchterm, category, Number(minprice), Number(maxprice));
            console.log("Done:", posts);
            res.status(200).json(posts);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    } else {
        console.log("General query");
        const posts = await generalquery(searchterm, Number(minprice), Number(maxprice));
        console.log("Done:", posts);
        res.status(200).json(posts);
    }
});

aggregrouter.get('/allcat', async (req, res) => {
    const server = req.query.server?.toString();
    console.log(server);
    res.json(listallcat(server));
});

aggregrouter.post('/newpost', async (req, res) => {
    const data = await req.body;
    var serveraddr: string = data.server?.toString();
    if(!serveraddr) serveraddr = serverslist().find(s => calculateBetweenDates(s.lastactive, new Date()) < 15)?.address ?? "";
    //console.log(serveraddr);
    const newpost: Post = {
        title : data.post.title,
        category: data.post.category,
        publish: data.post.publish,
        price: data.post.price,
        author: data.post.author,
        signature: data.post.signature,
        description: data.post.description,
        created: new Date(),
        //categoryRelation: (await listallcat(serveraddr)).find(c => c.name === data.post.category)
    };

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
        publish: data.post.publish,
        price: data.post.price,
        author: data.post.author,
        signature: data.post.signature,
        description: data.post.description,
        created: data.post.created,
    };

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

});



export default aggregrouter;