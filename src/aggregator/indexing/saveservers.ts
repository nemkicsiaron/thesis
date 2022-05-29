import { writeFileSync } from "fs";
import IServer from "../interfaces/servers";
import { serverslist } from "./indexer";
import { ServerListEmpty } from "./servererrors";

export default function saveservers() {
    try{
        const servers: IServer[] = serverslist();
        if(servers.length <= 0) throw new ServerListEmpty("No servers to save!");
        const servstr: string[] = servers.map(s => s.address);
        console.log("Saving servers: " + servers);
        writeFileSync(".servers.json", servstr.join(","), "utf8");
    } catch(error: any) {
        if(error instanceof ServerListEmpty) {
            console.error(error.message);
            return;
        }
        console.error(error);
    }
}
