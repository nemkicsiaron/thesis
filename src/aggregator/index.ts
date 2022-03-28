import express from "express";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import routes from "./routes";
import controller from "./auth/controller/user"

const aggregator: express.Application = express();
const port: number = 4000;
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 100, // 100 req per `window` per IP
    standardHeaders: true // return rate limit info as RateLimit-* header
});

aggregator.use(express.json());
aggregator.use(routes);
aggregator.use(limiter);

aggregator.listen(port,() => {
    console.log(`Aggregator Server listening on port: ${port}`);
});