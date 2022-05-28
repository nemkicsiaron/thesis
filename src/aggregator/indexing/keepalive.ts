import IServer from "../interfaces/servers";
import { badaddr, serverslist, update } from "./indexer";

async function probe(s: IServer) {
    try {
        const res = await fetch(s.address + "/api/probe", {
            method: "get",
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();
        if(res.ok) {
            update(s.address, JSON.parse(data.categories));
        }
    } catch (error: any) {
        console.error(error);
        if(s.lastactive.getTime() <= new Date().getTime() + (4 * 15 * 60 * 1000) || error instanceof TypeError) {
            badaddr(s.address);
        }
    }
}

export async function probeeach() {
    try {
        await Promise.all(serverslist().map(s => {
            console.log("Probing " + s.address);
            probe(s);
        }));
        console.log(serverslist());
    } catch (error) {
        console.error(error);
    }
}

export function keepalive() {
    setInterval(probeeach, 15 * 60 * 1000);
}