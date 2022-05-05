import { writeFileSync } from "fs";
import { serverslist } from "./indexer";

export default function saveservers() {
    try{
        const servers: string = JSON.stringify(serverslist());
        console.log("Saving servers: " + servers);
        writeFileSync(".servers.json", servers);
    } catch(error: any) {
        console.error(error);
    }
}
