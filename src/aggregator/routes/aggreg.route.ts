import { Router } from "express";
import { indexer, serverslist } from "../indexing/indexer";
import generalquery from "../query/generalquery";
import servercatquery from "../query/servercatquery";

const aggregrouter = Router();

aggregrouter.get('/', (req, res) => {
    return res.json("Lajos");
});

aggregrouter.get('/alldb', (req, res) => {
    try {
        res.json(serverslist());
    } catch (error) {
        console.error(error);
    }
});

aggregrouter.post('/discover', (req, res) => {
    try {
        res.json(indexer(req.body.address, req.body.cat));
    } catch (error) {
        console.error(error);
    }
});

/*aggregrouter.get('/findpost/:searchterm/:category/:minprice/:maxprice', async (req, res) => {
    console.log("EZ A JÓ GET");
    const searchterm = req.params.searchterm;
    const category = req.params.category;
    const minprice = req.params.minprice;
    const maxprice = req.params.maxprice;
    if(category) {
        const posts = servercatquery(searchterm, category, Number(minprice), Number(maxprice));
        res.status(200).json(posts);
    } else {
        const posts = generalquery(searchterm, Number(minprice), Number(maxprice));
        res.status(200).json(posts);
    }
});

aggregrouter.get('/findpost', async (req, res) => {
    console.log(req.query);
    const category = "" //req.params.category;
    const searchterm = "" //req.params.searchterm;
    const minprice = "" //req.params.minprice;
    const maxprice = "" //req.params.maxprice;
    if(category) {
        const posts = servercatquery(searchterm, category, Number(minprice), Number(maxprice));
        res.status(200).json(posts);
    } else {
        const posts = generalquery(searchterm, Number(minprice), Number(maxprice));
        res.status(200).json(posts);
    }
});*/


aggregrouter.get(['/findpost', '/:searchterm' , '/:category' , '/:minprice', '/:maxprice'], (req, res) => {
    const category = req.params.category || (req.query.category ?? "").toString();
    const searchterm = req.params.searchterm || (req.query.searchterm ?? "").toString();
    const minprice = req.params.minprice || (req.query.minprice ?? "").toString();
    const maxprice = req.params.maxprice || (req.query.maxprice ?? "").toString();

    console.log(new Date(), "Searching for:", searchterm, category, minprice, maxprice);

    if(category) {
        try {
            console.log("Category query");
            const posts = servercatquery(searchterm, category, Number(minprice), Number(maxprice));
            console.log("Done");
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(404).json(error);
        }
    } else {
        console.log("General query");
        const posts = generalquery(searchterm, Number(minprice), Number(maxprice));
        res.status(200).json(posts);
    }
});

aggregrouter.get('/allcat', async (req, res) => {
    var response = await fetch("http://localhost:3000/api/allcat");
    var data = await response.json();
    res.json(data);
});

export default aggregrouter;