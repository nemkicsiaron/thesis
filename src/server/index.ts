import express from "express";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit"
import discovery from "./functions/discovery";
import routes from "./routes";
import { aggregatorUri, ownUri, port } from "./util/config";
import startup from "./util/startup";

const server: express.Application = express();
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 100, // 100 req per `window` per IP
    standardHeaders: true // return rate limit info as RateLimit-* header
});


server.use(express.json());
server.use(routes);
server.use(limiter);

startup();

server.listen(port, () => {
    discovery(aggregatorUri, ownUri);
    console.log(`Server listening on port: ${port}`);
});