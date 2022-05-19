import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";
import IServer from "../interfaces/servers";

async function filterbycategory(category: string): Promise<IServer[]> {
    var servers = serverslist();
    const results = await Promise.all(servers.map(async function(s) {
        const fetchres = await fetch(s.address + '/api/filterbycategory?' + new URLSearchParams({ category: category }))
        const data = await fetchres.json();
        return { server: s, hascategory: data === true};
    }))

    return results.filter(x => x.hascategory).map(x => x.server);
};

export default async function servercatquery(searchterm: string, category: string, minprice: string, maxprice: string, author: string, signature: string): Promise<APIReturn> {
    console.log(new Date(), "Searching category including servers for: " + searchterm);

    const goodservers = await filterbycategory(category);
    var posts: Post[] = [];

    if (goodservers.length === 0 || !goodservers) throw new Error("No servers found storing given category: " + category);

    if(author)
    {
        await Promise.all(goodservers.map(async s => {
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
    } else {
        Promise.all(goodservers.map(async s => {
            try {
                const res = (await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                    searchterm: searchterm,
                    minprice: minprice,
                    maxprice: maxprice,
                    signature: signature
                })));
                posts.push(...(await res.json()));
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    }

    return { posts: posts, error: false, message:"Success" };
};