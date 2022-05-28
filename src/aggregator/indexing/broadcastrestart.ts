import { serverslist } from "./indexer";

export default async function broadcastrestart()  {
    const servers = serverslist();
    await Promise.all(servers.map(async s => {
        const result = await fetch(`${s.address}/api/restart`);
        if(!result.ok) {
            console.error("Failed to broadcast restart " + s.address);
        }
    }));
}