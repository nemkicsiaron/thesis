import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function deletepost(post: Post, server?: string): Promise<APIReturn> {
    var deleted: APIReturn = {
        posts: [],
        error: false,
        message: ""
    };
    const options: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(post)
    };

    if (!server) {
        const servers = serverslist();
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/deletepost', options);
                const data: APIReturn = await res.json();
                deleted = data
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    } else {
        try {
            const res = await fetch(server + "/api/deletepost", options);
            const data: APIReturn = await res.json();
            deleted = data
        } catch (error: any) {
            console.error(error);
            return { posts: [], error: true, message: error.message };
        }
    }
    return deleted;
}