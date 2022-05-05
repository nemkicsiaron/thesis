import express from "express";
import cors from "cors";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import routes from "./routes";
import keepalive from "./indexing/keepalive";
import saveservers from "./indexing/saveservers";
import loadservers from "./indexing/loadservers";
//import controller from "./auth/controller/user"

const aggregator: express.Application = express();
const port: number = 4000;
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 100, // 100 req per `window` per IP
    standardHeaders: true // return rate limit info as RateLimit-* header
});

aggregator.use(express.json());
aggregator.use(cors());
aggregator.use(routes);
aggregator.use(limiter);

loadservers();
keepalive();

aggregator.listen(port,() => {
    console.log(`Aggregator Server listening on port: ${port}`);
});

process.once("SIGUSR2", () => {
    saveservers();
    console.log("Aggregator Server stopped USR2!");
    process.kill(process.pid, "SIGUSR2");
});

process.once("SIGINT", () => {
    saveservers();
    console.log("Aggregator Server stopped with SIGINT!");
    process.kill(process.pid, "SIGINT");
});