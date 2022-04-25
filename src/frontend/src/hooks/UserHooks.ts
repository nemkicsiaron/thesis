
export default function useRegister() {
    const register = async (password: string, onGenerated:(pubkey: ArrayBuffer, privkey: ArrayBuffer) => void ) => {

        if(!password) {
            return{
                message: "No password given!"
            };
        } else if (password.length < 6) {
            return{
                message: "Password too short!"
            };
        }
        let keypair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 4096,
                publicExponent: new Uint8Array(password.length),
                hash: {name: "SHA-256"}
            },
            true,
            ["encrypt", "decrypt", "sign", "verify"]
        );
        let pubkey = await window.crypto.subtle.exportKey("spki", keypair.publicKey);
        let privkey = await window.crypto.subtle.exportKey("pkcs8", keypair.privateKey);

        onGenerated( pubkey, privkey);
    }
    return {register: register};
}