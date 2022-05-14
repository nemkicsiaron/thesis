import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";

export default async function generalquery(searchterm: string, minprice?: number, maxprice?: number, author?: string) {
    console.log(new Date(), "Searching all servers for: " + searchterm);

    var posts: Post[] = [];
    const servers = serverslist();
    if(author) {
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/findownpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice ? minprice.toString() : "",
                    maxprice: maxprice ? maxprice.toString() : "",
                    author: author
                }));
                posts.push(...(await res.json()));
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    } else {
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice ? minprice.toString() : "",
                    maxprice: maxprice ? maxprice.toString() : ""
                }));
                posts.push(...(await res.json()));
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    }

    return {posts: posts, error: false, message: "Success"};
}