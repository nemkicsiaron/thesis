import { Router } from "express";
import fetch from "node-fetch"
import { indexer } from "../indexing/indexer";

const aggregrouter = Router();

aggregrouter.get('/', (req, res) => {
    return res.json("Lajos");
});

aggregrouter.get('/alldb', (req, res) => {
    try {
        res.json(indexer());
    } catch (error) {
        console.error(error);
    }
});

aggregrouter.get('/cat', async (req, res) => {
    var response = await fetch("http://localhost:3000/api/allcat");
    var data = await response.json();
    res.json(data);
});

export default aggregrouter;