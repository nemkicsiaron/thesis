import express from "express";
import routes from "./routes";
import fetch from "node-fetch"
import controller from "./auth/controller/user"
import { Http2ServerRequest } from "http2";

const aggregator: express.Application = express();
const port: number = 4000;

aggregator.use(express.json());
aggregator.use(routes)


aggregator.listen(port,() => {
    console.log(`Aggregator Server listening on port: ${port}`);
});