import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import IServer from "../interfaces/servers";

function filterbycategory(category: string): IServer[] {
    return (serverslist().filter(async function(s) {
        const fetchres = await fetch(s.address + '/api/filterbycategory?' + new URLSearchParams({ category: category }))
        console.log(fetchres.status);
        return fetchres.status === 200;
    }))
};

export default function servercatquery(searchterm: string, category: string, minprice?: number, maxprice?: number): Post[] {
    console.log("Searching category including servers for: " + searchterm);

    const goodservers = filterbycategory(category);
    var posts: Post[] = [];

    console.log(goodservers);

    if (goodservers.length === 0 && !goodservers) throw new Error("No servers found");

    goodservers.forEach(async s => {
        try {
            const res = (await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                searchterm: searchterm.toString(),
                minprice: minprice ? minprice.toString() : "",
                maxprice: maxprice ? maxprice.toString() : ""
            })));
            posts += (await res.json());
        } catch (error) {
            console.error(error);
        }
    });

    return posts;
};