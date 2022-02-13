import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";


const server: express.Application = express();
const port: number = 3000;
open({
    filename: "./test.db",
    driver: sqlite3.Database
}).then((db) => {

});
server.listen(port,() => {
    console.log(`Server listening on port: ${port}`);
});