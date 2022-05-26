import Category from "../interfaces/category";
import IServer from "../interfaces/servers";
import { probeeach } from "./keepalive";
import ServerAlreadyRegistered from "./ServerError";

var servers: IServer[] = [];


export function indexer(addr: string, categories?: Category[]): number {
    if (servers.some(server => server.address === addr)){
        if(servers.some(server => JSON.stringify(server.categories) === JSON.stringify(categories)))
            throw new ServerAlreadyRegistered("Server already registered on: " + addr);
        else if (categories) {
            console.log("Updating categories for: " + addr);
            update(addr, categories);
        }
    }
    else console.log("Registered new server on address: " + addr);

    return servers.push({address: addr, categories: categories || [], lastactive: new Date()});
}

export function update(addr: string, categories: Category[]): void {
    servers.map(s => {if(s.address === addr) {s.lastactive = new Date(); categories ? s.categories = categories : s.categories;}});
}

export function badaddr(addr: string): void {
    servers = servers.filter(s => {return s.address !== addr});
}

export function parseservers(servers: any[]) {
    servers.map(s => {
        indexer(s.address, s.categories);
    });
    probeeach();
}

export function serverslist(): IServer[] {return servers}