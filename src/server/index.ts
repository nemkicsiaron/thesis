import express from "express";
import routes from "./routes";

const server: express.Application = express();
const port: number = 3000;


server.use(express.json());
server.use(routes)

server.listen(port,() => {
    console.log(`Server listening on port: ${port}`);
});