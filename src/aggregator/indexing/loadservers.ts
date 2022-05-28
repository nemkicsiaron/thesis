import { readFileSync } from "fs";
import { parseservers } from "./indexer";

export default async function loadservers(): Promise<void> {
    console.log("Loading servers");
    try {
        const servstr = readFileSync(".servers.json", "utf8");
        const servers = servstr.split(",");
        console.log(servers);
        await parseservers(servers).then(() => {
            console.log("Servers loaded!");
        });
    } catch (error: any) {
        if(error.code === "ENOENT") {
            console.error("No servers file found");
        }
        else {
            console.error(error);
        }
    }
}