import { generateKeyPair } from "crypto";

export default function useRegister() {
    const register = async (username: string, password: string, onGenerated:(pubkey: string, privkey: string) => void ) => {

        if(!username) {
            return{
                message: "No username given!"
            };
        }

        if(!password) {
            return{
                message: "No password given!"
            };
        } else if (password.length < 6) {
            return{
                message: "Password too short!"
            };
        }

        let user = {
            username: username || "",
            publickey: "",
            privatekey: ""
        }

        generateKeyPair("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: password
            }
        }, (error, publicKey, privateKey) => {
            if(error) {
                return console.error(error);
            }
            else {
                user.privatekey = privateKey;
                user.publickey = publicKey;
            }
        });
    };

    return {register: register};
}