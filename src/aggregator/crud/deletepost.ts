import { serverslist } from "../indexing/indexer";
import Post from "../interfaces/post";

export default async function deletepost(post: Post, server?: string): Promise<Post | undefined> {
    var deleted;
    if (!server) {
        const servers = serverslist();
        await Promise.all(servers.map(async s => {
            try {
                const res = await fetch(s.address + '/api/deletepost', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                });
                const data = await res.json();
                if (data.length > 0 && res.ok) deleted = data
            } catch (error: any) {
                console.error(error);
                return { posts: [], error: true, message: error.message };
            }
        }));
    } else {
        const deleteres = await fetch(server + "/api/deletepost", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(post)
        });
        const success = await deleteres.json();
    }
    return deleted;
}