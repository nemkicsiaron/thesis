import Post from "../../interfaces/post";
import { aggregatorUri } from "../../config/config";
import IUser from "../../interfaces/user";
import { importPrivateKey, importPublicKey, str2ab } from "./UserServices";
import { pathToFileURL } from "url";

export async function listAllPosts(): Promise<Post[]> {
    const result = await fetch(`${aggregatorUri}/aggreg/allposts`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const posts = await result.json();
    return posts.posts;
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
        if(result.ok) {
            const posts = await result.json();
            //console.log(posts);
            return posts;
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

async function verifyPost(signature: string, publicKeyStr: string, privateKeyStr: string, encodedMessage: Uint8Array): Promise<boolean> {
    const publicKey: CryptoKey | null = await importPublicKey(publicKeyStr);
    const privateKey: CryptoKey | null = await importPrivateKey(privateKeyStr);
    // console.log(publicKey);
    // if(!publicKey) return false;
    // const res = await window.crypto.subtle.verify(
    //     {
    //         name: "RSA-PSS",
    //         saltLength: 32,
    //     },
    //     publicKey,
    //     str2ab(signature),
    //     encodedMessage
    // );
    // console.log("Verifying:", signature, publicKey, res);
    // return res;

    if(privateKey && publicKey) {
        try {
            const sign = await window.crypto.subtle.sign({name: "RSA-PSS", saltLength: 32}, privateKey, encodedMessage);
            const signature = window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(sign)]));
            const res = await window.crypto.subtle.verify({name: "RSA-PSS", saltLength: 32}, publicKey, str2ab(signature), encodedMessage);
            console.log("Verifying:", signature, publicKey, res);
            return res;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
}

export async function findOwnPost(searchterm: string, category: string, minprice: string, maxprice: string, author: IUser): Promise<Post[]> {
    try {
        if(category.includes("Minden")) category = "";
        const result = await fetch(`${aggregatorUri}/aggreg/findownpost/?` + new URLSearchParams({
                searchterm: searchterm,
                category: category,
                minprice: minprice ? minprice.toString() : "",
                maxprice: maxprice ? maxprice.toString() : "",
                author: author.username
            }), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const posts: Post[] = await result.json();
        if(!posts.length) return [];
        return posts.filter(p => verifyPost(p.signature ?? "", author.publickey, author.privatekey, new TextEncoder().encode(p.title + p.description)));
    } catch (error) {
        console.error(error);
        return [];
    }
}