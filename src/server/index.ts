import express from "express";

const server: express.Application = express();
const port: number = 3000;

server.listen(port,() => {
    console.log(`Server listening on port: ${port}`);
});