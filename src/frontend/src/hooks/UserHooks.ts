
export default function useRegister() {
    const register = async (password: string, onGenerated:(pubkey: string, privkey: string) => void ) => {

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
    }
    return {register: register};
}