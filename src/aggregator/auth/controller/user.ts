/*import { generateKey, generateKeyPair } from "crypto";
import { NextFunction, Request, Response } from "express";
import { writeFile, readFile, rmSync } from "fs";
import IUser from "../../interfaces/user";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, "Token validated");
    return res.status(200).json({
        message: "Authorized"
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = await req.body;

    if(!username) {
        res.status(400).json({
            message: "No username given!"
        });
    }

    if(!password) {
        res.status(400).json({
            message: "No password given!"
        });
    } else if (password.length < 6) {
        res.status(400).json({
            message: "Password too short!"
        });
    }


    let user: IUser = {
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
            res.status(500).json({
                message: "Error generating keypair"
            });
            return console.error(error);
        }
        else {
            user.privatekey = privateKey;
            user.publickey = publicKey;
        }
    });

    localStorage.setItem(username, JSON.stringify(user));

    writeFile(".user.secret", user.username + '\n' + user.publickey + '\n' + user.privatekey, e => {
        if(e) {
            return console.error(e);
        }
        console.log("Secrets exported successfully!");
    });

    res.status(200).json(user);
};

const login = (req: Request, res: Response, next: NextFunction): IUser | null => {
    let {username, password} = req.body;
    let user: IUser;
    readFile(".user.secret", (e, data) => {
        if(e) {
            return console.error(e);
        }
        let [fusername, publickey, privatekey] = data.toString().split('\n');
        if(fusername === username) {
            user.username = fusername;
            user.publickey = publickey;
            user.privatekey = privatekey;
            res.status(200).json("successfully logged in");
            return user;
        }
        else res.status(400).json({
            message: "Invalid username or password!"});
    });
    return null;
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {

};

export default { validateToken, register, login, getAllUsers};
*/