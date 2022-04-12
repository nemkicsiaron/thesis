import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";

export default function generalquery(searchterm: string, minprice?: number, maxprice?: number) {
    console.log("Searching all servers for: " + searchterm);

    var posts: Post[] = [];

    serverslist().forEach(async s => {
        try {
            const res = (await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                searchterm: searchterm,
                minprice: minprice ? minprice.toString() : "",
                maxprice: maxprice ? maxprice.toString() : ""
            })));
            posts += await res.json();
        } catch (error) {
            console.error(error);
        }
    });

    return posts;
}