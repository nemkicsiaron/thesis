import listallcat from "./listallcat";

export default async function discovery(discoveryaddr: string, ownaddr: string): Promise<boolean> {
    discoveryaddr += "/aggreg/discover";
    try {
        const categorylist: string[] = (await listallcat()).map(c => c.name);
        const body = {
            address: ownaddr,
            cat: categorylist
        };
        await fetch(discoveryaddr, {
            method: "post",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}