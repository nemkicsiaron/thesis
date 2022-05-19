import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function updatepost(post: Post, oldsignature: string, server?: string): Promise<APIReturn> {
    var updated: APIReturn = {
        posts: [],
        error: false,
        message: ""
    };
    //console.log(new Date(), "Updating post: ", post, " on server: " + server);
    const body = JSON.stringify({post: post, oldsignature: oldsignature});
    //console.log(new Date(), "Body: ", body);
    const options: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            },
        body: body
    };

    if (!server) {
        const servers = serverslist();
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/updatetepost', options);
                console.log("Result: " + res)
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
            console.log(res)
            const data: APIReturn = await res.json();
            updated = data
        } catch (error: any) {
            console.error(error);
            return { posts: [], error: true, message: error.message };
        }
    }

    return updated;
}