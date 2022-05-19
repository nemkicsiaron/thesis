import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function generalquery(searchterm: string, minprice: string, maxprice: string, author: string, signature: string): Promise<APIReturn> {
    console.log(new Date(), "Searching all servers for: " + searchterm + " with minprice: " + minprice + " and maxprice: " + maxprice + " and author: " + author);

    var posts: Post[] = [];
    const servers = serverslist();
    if(author)
    {
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/findownpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice,
                    maxprice: maxprice,
                    author: author,
                    signature: signature
                }));
                posts.push(...(await res.json()));
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
                const res = await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice,
                    maxprice: maxprice,
                    signature: signature
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