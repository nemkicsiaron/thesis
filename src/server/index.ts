import express from "express";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit"
import discovery from "./functions/discovery";
import routes from "./routes";
import { aggregatorUri } from "./util/config";

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

server.listen(port, () => {
    discovery(aggregatorUri);
    console.log(`Server listening on port: ${port}`);
});