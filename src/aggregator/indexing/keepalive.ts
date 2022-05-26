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
            update(s.address, data.categories);
        }
    } catch (error: any) {
        console.error(error);
        if(s.lastactive.getTime() <= new Date().getTime() + (4 * 15 * 60 * 1000)) {
            badaddr(s.address);
        }
    }
}

export function probeeach() {
    Promise.all(serverslist().map(s => {
        console.log("Probing " + s.address);
        probe(s);
    }));
    console.log(serverslist());
}

export function keepalive() {
    setInterval(probeeach, 15 * 60 * 1000);
}