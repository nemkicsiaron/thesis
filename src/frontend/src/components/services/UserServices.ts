export function hashCode(pw: string): number {
    var hash: number = 0;
    if (pw.length === 0) return hash;
    for (let i = 0; i < pw.length; i++) {
        const char = pw.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export async function importKeyPair(publicKeyStr: string, privateKeyStr: string): Promise<CryptoKeyPair | null> {
    try {
        const publicKey = await window.crypto.subtle.importKey("spki", str2ab(window.atob(publicKeyStr)), { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["verify"])
        const privateKey = await window.crypto.subtle.importKey("pkcs8", str2ab(window.atob(privateKeyStr)), { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["sign"])
        console.log("Keypair imported: ", { publicKey, privateKey });
        return { publicKey, privateKey };
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function importPrivateKey(privateKeyStr: string): Promise<CryptoKey | null> {
    try {
        const privateKey = await window.crypto.subtle.importKey("pkcs8", str2ab(window.atob(privateKeyStr)), { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["sign"]);
        console.log("Private Key imported: ", { privateKey });
        return privateKey;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function importPublicKey(publicKeyStr: string): Promise<CryptoKey | null> {
    try {
        const publicKey = await window.crypto.subtle.importKey("spki", str2ab(window.atob(publicKeyStr)), { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["verify"]);
        console.log("Public Key imported: ", { publicKey });
        return publicKey;
    } catch (error) {
        console.error(error);
        return null;
    }
}
