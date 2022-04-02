import Category from "../interfaces/category";
import IServer from "../interfaces/servers";

var servers: IServer[] = [];

export function indexer(addr: string, categories?: Category[]): number {
    console.log("Registered new server on address: " + addr);
    return servers.push({address: addr, categories: categories || [], activesince: new Date()});
}

export function update(addr: string): void {
    servers.map(s => {if(s.address === addr) {s.activesince = new Date()}});
}

export function badaddr(addr: string): void {
    servers = servers.filter(s => {return s.address !== addr});
}

export function serverslist(): IServer[] {return servers}