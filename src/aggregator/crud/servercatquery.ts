import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
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

export default async function servercatquery(searchterm: string, category: string, minprice?: number, maxprice?: number): Promise<Post[]> {
    console.log(new Date(), "Searching category including servers for: " + searchterm);

    const goodservers = await filterbycategory(category);
    var posts: Post[] = [];

    //console.log(goodservers);

    if (goodservers.length === 0 || !goodservers) throw new Error("No servers found storing given category: " + category);

    Promise.all(goodservers.map(async s => {
        try {
            const res = (await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
                searchterm: searchterm.toString(),
                minprice: minprice ? minprice.toString() : "",
                maxprice: maxprice ? maxprice.toString() : ""
            })));
            posts.push(...(await res.json()));
        } catch (error) {
            console.error(error);
        }
    }));

    return posts;
};