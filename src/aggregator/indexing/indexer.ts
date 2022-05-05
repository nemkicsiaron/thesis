import Category from "../interfaces/category";
import IServer from "../interfaces/servers";

var servers: IServer[] = [];

export function indexer(addr: string, categories?: Category[]): number {
    if (servers.some(server => server.address === addr)) throw new Error("Server already registered on: " + addr);
    else console.log("Registered new server on address: " + addr);

    return servers.push({address: addr, categories: categories || [], lastactive: new Date()});
}

export function update(addr: string): void {
    servers.map(s => {if(s.address === addr) {s.lastactive = new Date()}});
}

export function badaddr(addr: string): void {
    servers = servers.filter(s => {return s.address !== addr});
}

export function parseservers(servers: any[]) {
    servers.map(s => {
        indexer(s.address, s.categories);
    });
}

export function serverslist(): IServer[] {return servers}