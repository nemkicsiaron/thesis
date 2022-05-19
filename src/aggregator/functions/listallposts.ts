import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function listallposts(server?: string): Promise<APIReturn> {
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
        } catch (error: any) {
            console.error(error);
            return { posts: [], error: true, message: error.message || error };
        }
    }));

    return { posts: posts, error: false, message: "Success" };
}