import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";

export default async function listallposts() {
    console.log("Searching for all posts!");

    var posts: Post[] = [];

    await Promise.all(serverslist().map(async s => {
        try {
            const res = await fetch(s.address + '/api/findpost/?' + new URLSearchParams({
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