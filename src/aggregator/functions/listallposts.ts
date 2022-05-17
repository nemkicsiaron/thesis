import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";

export default async function listallposts(server?: string): Promise<Post[]> {
    console.log("Searching for all posts!");

    var posts: Post[] = [];
    const list = serverslist().map(s => s.address);
    const servers = (server && server in list) ? [server] : list;

    await Promise.all(servers.map(async s => {
        try {
            const res = await fetch(s + '/api/findpost/?' + new URLSearchParams({
                searchterm: "",
                minprice: "",
                maxprice: ""
            }));
            posts.push(...(await res.json()));
        } catch (error) {
            console.error(error);
        }
    }));

    return posts;
}