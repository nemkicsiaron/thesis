import IServer from "../../interfaces/servers";
import { aggregatorUri } from "../../util/config";

export default async function listAllServers(): Promise<IServer[]> {

    const result = await fetch(`${aggregatorUri}/aggreg/alldb`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const servers: IServer[] = await result.json();
    return servers;

}