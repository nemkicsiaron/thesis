import { aggregatorUri } from "../util/config";
import Post from "../interfaces/post";

export function useRegister() {
    const register = async (password: string, onGenerated:(pubkey: string, privkey: string) => void ) => {

        if(!password) {
            return{
                error: true,
                message: "Nincs jelszó!"
            };
        } else if (password.length < 6) {
            return{
                error: true,
                message: "A jelszónak legalább 6 karakter hosszúnak kell lennie!"
            };
        }
        let keypair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-PSS",
                modulusLength: 2048,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: {name: "SHA-256"},
            },
            true,
            ["sign", "verify"]
        );

        let pubkey = await window.crypto.subtle.exportKey("spki", keypair.publicKey);
        let privkey = await window.crypto.subtle.exportKey("pkcs8", keypair.privateKey);
        //privkey = window.crypto.subtle.wrapKey("pkcs8", privkey, )

        let pubkeystr = window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(pubkey)]));
        let privkeystr = window.btoa(String.fromCharCode.apply(null, [...new Uint8Array(privkey)]));
        onGenerated(`-----BEGIN PUBLIC KEY-----\n${pubkeystr}\n-----END PUBLIC KEY-----`, `-----BEGIN PRIVATE KEY-----\n${privkeystr}\n-----END PRIVATE KEY-----`);
        return {error: false, message: "Sikeres kulcsgenerálás!"};
    }
    return {register: register};
}

export function useCreate() {
    const create = async (post: Post, server: string) => {
        try{
            const result = await fetch(`${aggregatorUri}/aggreg/newpost`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({post: post, server: server})
            });
            const postdone: Post = await result.json();
            console.log("Post created:", postdone);
            return {postdone: postdone, message: "Sikeres hozzáadás!"};
        } catch (error) {
            console.error(error);
            return {message: "Hiba történt!", error: true}
        };
    }
    return {create: create};
}

export function useUpdate() {
    const update = async (post: Post, server: string, oldsignature: string) => {
        try{
            const result = await fetch(`${aggregatorUri}/aggreg/updatepost`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({post: post, server: server, oldsignature: oldsignature})
            });
            const postdone: Post = await result.json();
            console.log("Post updated:", postdone);
            return {postdone: postdone, message: "Sikeres frissítés!"};
        } catch (error) {
            console.error(error);
            return {message: "Hiba történt: " + error, error: true}
        };
    }
    return {update: update};
}