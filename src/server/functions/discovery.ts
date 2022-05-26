import listallcat from "./listallcat";

export default async function discovery(discoveryaddr: string, ownaddr: string): Promise<boolean> {
    discoveryaddr += "/aggreg/discover";
    try {
        const categorylist = (await listallcat());
        const body = {
            address: ownaddr,
            categories: categorylist
        };
        await fetch(discoveryaddr, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
        return true;
    } catch (error) {
        if(error instanceof TypeError && error.message.includes("fetch failed") && error.message.includes("UND_ERR_HEADERS_TIMEOUT")) {
            console.error("Discovery server is not responding");
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        }
        console.error(error);
        return false;
    }
}