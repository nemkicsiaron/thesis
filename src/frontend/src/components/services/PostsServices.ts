import Post from "../../interfaces/post";
import { aggregatorUri } from "../../config/config";
import IUser from "../../interfaces/user";
import { importPublicKey } from "./UserServices";
import APIReturn from "../../interfaces/return";

export async function listAllPosts(server?: string): Promise<Post[]> {
    const result = await fetch(`${aggregatorUri}/aggreg/allposts?` + new URLSearchParams({
        server: server ?? ""
    }), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const postsres: APIReturn = await result.json();
    console.log(postsres);
    if(postsres.error) {
        throw new Error(postsres.message);
    }
    // console.log("Posts: ", posts);
    return postsres.posts;
}

export async function findPost(searchterm: string, category: string, minprice: string, maxprice: string, signature: string, server?: string): Promise<Post[]> {
    try {
        if(category.includes("Minden")) category = "";
        console.log(new Date(), "Searching for:", searchterm, category, minprice, maxprice, signature);
        const result = await fetch(`${aggregatorUri}/aggreg/findpost/?` + new URLSearchParams({
                searchterm: searchterm,
                category: category,
                minprice: minprice,
                maxprice: maxprice,
                signature: signature,
                server: server ?? ""
            }), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        if(result.ok) {
            const posts: APIReturn = await result.json();
            console.log("Posts got with fetch" + posts);
            if(posts.error) {
                throw new Error(posts.message);
            }
            return posts.posts;
        }
        else {
            console.error("Error: " + result.status); // result.statusText
            return [];
        };
    } catch (error) {
        console.error(error);
        return [];
    }
}

function b642ab(base64_string: string): Uint8Array{
    return Uint8Array.from(window.atob(base64_string), c => c.charCodeAt(0));
}

export async function verifyPost(signature: string, publicKeyStr: string, encodedMessage: Uint8Array): Promise<boolean> {
    const publicKey: CryptoKey | null = await importPublicKey(publicKeyStr);
    if(!publicKey) return false;
    try {
        const res = await window.crypto.subtle.verify({name: "RSA-PSS", saltLength: 32}, publicKey, b642ab(signature), encodedMessage);
        //console.log("Verifying:", signature, publicKey, res);
        return res;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function findOwnPost(searchterm: string, category: string, minprice: string, maxprice: string, author: IUser, signature: string): Promise<Post[]> {
    try {
        if(category.includes("Minden")) category = "";
        const result = await fetch(`${aggregatorUri}/aggreg/findownpost/?` + new URLSearchParams({
                searchterm: searchterm,
                category: category,
                minprice: minprice,
                maxprice: maxprice,
                author: author.username,
                signature: signature
            }), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const postsres: APIReturn = await result.json();
        if(postsres.error) { return []; }
        return postsres.posts.filter((p: Post) => verifyPost(p.signature ?? "", author.publickey, new TextEncoder().encode(p.title + p.description)));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deletePost(post: Post, server?: string) {
    try {
        const result = await fetch(`${aggregatorUri}/aggreg/deletepost`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post: post,
                server: server ?? ""
            })
        });
        const res: APIReturn = await result.json();
        if(res.error) {
            throw new Error(res.message);
        }
        return res.posts;
    } catch (error) {
        console.error(error);
        return false;
    }
}