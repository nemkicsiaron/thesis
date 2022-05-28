import Category from "../interfaces/category";
import IServer from "../interfaces/servers";
import { probeeach } from "./keepalive";
import {ServerAlreadyRegistered} from "./ServerError";

var servers: IServer[] = [];

const comp = (a: Category, b: Category) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

export function indexer(addr: string, categories?: Category[]): number {
    if (servers.some(server => server.address === addr)){
        if(servers.some(server => JSON.stringify(server.categories.sort(comp)) === JSON.stringify(categories?.sort(comp))))
            throw new ServerAlreadyRegistered("Server already registered on: " + addr);
        else if (categories) {
            console.log("Updating categories for: " + addr);
            update(addr, categories.sort(comp));
            return servers.length;
        }
    }
    else console.log("Registered new server on address: " + addr);

    return servers.push({address: addr, categories: categories?.sort(comp) || [], lastactive: new Date()});
}

export function update(addr: string, categories: Category[]): void {
    try {
        console.log("Updating categories for: " + addr, categories.sort(comp));
        servers.map(s => {if(s.address === addr) {s.lastactive = new Date(); categories ? s.categories = categories.sort(comp) : s.categories.sort(comp);}});
    } catch (error) {
        console.error(error);
    }
}

export function badaddr(addr: string): void {
    servers = servers.filter(s => {return s.address !== addr});
}

export async function parseservers(servers: string[]) {
    try{
        servers.map(s => indexer(s));
        await probeeach();
    } catch (error) {
        console.error(error);
    }
}

export function serverslist(): IServer[] {return servers}