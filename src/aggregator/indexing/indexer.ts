import Category from "../interfaces/category";
import IServer from "../interfaces/servers";
// TODO: keep-alive

var servers: IServer[] = [];

export function indexer(addr: string, categories?: Category[]): number {
    return servers.push({address: addr, categories: categories || [], activesince: new Date()});
}

export function update(addr: string): void {
    servers.map(s => {if(s.address === addr) {s.activesince = new Date()}});
}

export function serverslist(): IServer[] {return servers}