import Post from "../../interfaces/post";
import { aggregatorUri } from "../../config/config";

export default async function listAllPosts(): Promise<Post[]> {

    const result = await fetch(`${aggregatorUri}/aggreg/allposts`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const posts: Post[] = await result.json();
    return posts;

}