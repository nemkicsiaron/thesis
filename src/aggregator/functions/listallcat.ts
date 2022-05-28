import { serverslist } from "../indexing/indexer";
import Category from "../interfaces/category";
import IServer from "../interfaces/servers";

export default async function listallcat(serveraddr: string) : Promise<string[]> {
    if(serveraddr) {
        var response = await fetch(serveraddr + "/api/allcat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                }
            });
        const allCats: Category[] = await response.json();
        return [...new Set(allCats.map(c => c.name))];
    }
    else {
        var allCats: Category[] = []
        try {
            await Promise.all(serverslist().map(async s => {
                try {
                    const res = await fetch(s.address + '/api/allcat', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                            }
                        });
                    allCats.push(...(await res.json()));
                } catch (error) {
                    console.error(error);
                }
            }));
        } catch (error) {
            console.error(error);
        }
        finally {
            return [...new Set(allCats.map(c => c.name))]
        }
    }
}