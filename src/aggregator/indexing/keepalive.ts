import IServer from "../interfaces/servers";
import { badaddr, serverslist, update } from "./indexer";

async function probe(s: IServer) {
    try {
        const res = await fetch(s.address + "/api/probe", {
            method: "get",
            headers: {"Content-Type": "application/json"}
        });

        if(res.ok) {
            update(s.address);
        }
    } catch (error: any) {
        console.error(error);
        if(s.activesince.getTime() <= new Date().getTime() + (4 * 15 * 60 * 1000)) {
            badaddr(s.address);
        }
    }
}

function probeeach() {
    serverslist().forEach(s => {
        console.log("Probing " + s.address);
        probe(s);
    });
    console.log(serverslist());
}

export default function keepalive() {
    setInterval(probeeach, 15 * 60 * 1000);
}