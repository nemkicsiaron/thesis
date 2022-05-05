import { readFileSync } from "fs";
import { parseservers } from "./indexer";

export default function loadservers(): void {
    console.log("Loading servers");
    try {
        const servers = JSON.parse(readFileSync(".servers.json", "utf8"));
        console.log(servers);
        parseservers(servers);
    } catch (error: any) {
        if(error.code === "ENOENT") {
            console.error("No servers file found");
        }
        else {
            console.error(error);
        }
    }
}