import Post from "../../interfaces/post";
import { aggregatorUri } from "../../config/config";

export async function listAllPosts(): Promise<Post[]> {
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

export async function findPost(searchterm: string, category: string, minprice: string, maxprice: string): Promise<Post[]> {
    try {
        if(category.includes("Minden")) category = "";
        const result = await fetch(`${aggregatorUri}/aggreg/findpost/?` + new URLSearchParams({
                searchterm: searchterm,
                category: category,
                minprice: minprice ? minprice.toString() : "",
                maxprice: maxprice ? maxprice.toString() : ""
            }), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const posts: Post[] = await result.json();
        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}