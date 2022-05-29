import Category from "../interfaces/category";
import IServer from "../interfaces/servers";
import { probeeach } from "./keepalive";
import {ServerAlreadyRegistered} from "./servererrors";

var servers: IServer[] = [];

//Compare two categories to determine if they are the same or one's name is lexicographically before the other's
const comp = (a: Category, b: Category) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

//Try to add a server to the list of servers if it is not already in the list
export function indexer(addr: string, categories?: Category[]): number {
    const matches = servers.filter(s => s.address === addr);
    if (matches.length === 1) {
        if(JSON.stringify(matches[0].categories.sort(comp)) === JSON.stringify(categories?.sort(comp)))
            throw new ServerAlreadyRegistered("Server already registered on: " + addr);
        else if(categories) {
            console.log("Updating categories for: " + addr);
            update(addr, categories.sort(comp));
            return servers.length;
        }
    }
    else console.log("Registered new server on address: " + addr);

    return servers.push({address: addr, categories: categories?.sort(comp) || [], lastactive: new Date()});
}

//Update the categories for a server and it's last active time
export function update(addr: string, categories: Category[]): void {
    try {
        console.log("Updating categories for: " + addr, categories.sort(comp));
        servers.map(s => {if(s.address === addr) {s.lastactive = new Date(); categories ? s.categories = categories.sort(comp) : s.categories.sort(comp);}});
    } catch (error) {
        console.error(error);
    }
}

//Remove a server from the list of servers
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