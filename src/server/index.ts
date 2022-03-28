import express from "express";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit"
import routes from "./routes";
import { aggregatorUri } from "./util/config";
import { listallcat } from "./functions/listallcat";

const server: express.Application = express();
const port: number = 3000;
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 100, // 100 req per `window` per IP
    standardHeaders: true // return rate limit info as RateLimit-* header
});


server.use(express.json());
server.use(routes);
server.use(limiter);

server.listen(port, async () => {
    try {
        const discoveryaddr = aggregatorUri + "/discover";
        console.log(discoveryaddr);
        const body = {
            address: "http://localhost:3000",
            cat: await listallcat()
        };
        await fetch(discoveryaddr, {
            method: "post",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
    } catch (error) {
        console.error(error);
    }
    console.log(`Server listening on port: ${port}`);
});