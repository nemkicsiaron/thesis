import Post from "../interfaces/post";
import APIReturn from "../interfaces/return";

export default async function createpost(newpost: Post, serveraddr: string): Promise<APIReturn> {
    var created: APIReturn = {
        posts: [],
        error: false,
        message: "Post created successfully"
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(newpost)
    };

    try {
        const res = await fetch(serveraddr + "/api/newpost", options);
        const data = await res.json();
        created = data
    } catch (error: any) {
        console.error(error);
        created.error = true;
        created.message = error.message || error;
    }

    return created;
}