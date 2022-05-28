import filterForUniques from "../functions/filterforuniques";
import { serverslist, update } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function generalquery(searchterm: string, minprice: string, maxprice: string, author: string, signature: string, server: string): Promise<APIReturn> {
    console.log(new Date(), "Searching all servers for: " + searchterm + " with minprice: " + minprice + " and maxprice: " + maxprice + " and author: " + author);

    var posts: Post[] = [];
    const servers = server.trim() ? [server] : serverslist().map(s => s.address);
    if(author)
    {
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s + '/api/findownpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice,
                    maxprice: maxprice,
                    author: author,
                    signature: signature
                }));
                posts.push(...(await res.json()));
                update(s, []);
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    }
    else
    {
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s + '/api/findpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice,
                    maxprice: maxprice,
                    signature: signature
                }));
                posts.push(...(await res.json()));
                update(s, []);
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    }

    return {posts: filterForUniques(posts), error: false, message: "Success"};
}