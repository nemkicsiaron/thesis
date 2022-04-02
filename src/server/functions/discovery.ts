import { Category } from "@prisma/client";
import listallcat from "./listallcat";

export default async function discovery(discoveryaddr: string) {
    discoveryaddr += "/aggreg/discover";
    try {
        const categorylist: Category[] = await listallcat(); 
        const body = {
            address: "http://localhost:3000",
            cat: categorylist.map(c => c.name)
        };
        await fetch(discoveryaddr, {
            method: "post",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
    } catch (error) {
        console.error(error);
    }
}