import { Router } from "express";
import { indexer, serverslist } from "../indexing/indexer";

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

aggregrouter.get('/allcat', async (req, res) => {
    var response = await fetch("http://localhost:3000/api/allcat");
    var data = await response.json();
    res.json(data);
});

export default aggregrouter;