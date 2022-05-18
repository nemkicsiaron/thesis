import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function updatepost(post: Post, oldsignature: string, server?: string): Promise<APIReturn> {
    var updated: APIReturn = {
        posts: [],
        error: false,
        message: ""
    };
    const options: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify({post: post, oldsignature: oldsignature})
    };

    if (!server) {
        const servers = serverslist();
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/updatetepost', options);
                const data: APIReturn = await res.json();
                updated = data
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    } else {
        try {
            const res = await fetch(server + "/api/updatepost", options);
            const data: APIReturn = await res.json();
            updated = data
        } catch (error: any) {
            console.error(error);
            return { posts: [], error: true, message: error.message };
        }
    }

    return updated;
}