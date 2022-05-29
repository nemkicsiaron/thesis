import express from "express";
import cors from "cors";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import routes from "./routes";
import { keepalive } from "./indexing/keepalive";
import saveservers from "./indexing/saveservers";
import loadservers from "./indexing/loadservers";
import broadcastrestart from "./indexing/broadcastrestart";

const aggregator: express.Application = express();
const port: number = 4000;

//Rate limiter
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 100, // 100 req per `window` per IP
    standardHeaders: true // return rate limit info as RateLimit-* header
});

aggregator.use(express.json());
aggregator.use(cors());
aggregator.use(routes);
aggregator.use(limiter);

//A simple quality of life improving try catch for automatic server handling on restarts and bootups
try
{
    await loadservers();
    await broadcastrestart();
    keepalive();
} catch (error) {
    console.error(error);
}

aggregator.listen(port,() => {
    console.log(`Aggregator Server listening on port: ${port}`);
});


//A simple quality of life improving functionality for automatic server handling on restarts and stops

process.once("SIGUSR2", async () => {
    saveservers();
    console.log("Aggregator Server stopped USR2!");
    process.kill(process.pid, "SIGUSR2");
});

process.once("SIGINT", async () => {
    saveservers();
    console.log("Aggregator Server stopped with SIGINT!");
    process.kill(process.pid, "SIGINT");
});