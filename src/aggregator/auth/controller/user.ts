import { NextFunction, Request, Response } from "express";
import { writeFile, readFile } from "fs";
import { generateKey } from "openpgp"
//import signJWT from "../functions/signJWT";
import IUser from "../../interfaces/user";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, "Token validated");
    return res.status(200).json({
        message: "Authorized"
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

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
    
    let { privateKey, publicKey } = await generateKey({
        type: "rsa",
        userIDs: [{name: username}],
        passphrase: password
    });

    let user: IUser = {
        username: username || "",
        publickey: publicKey,
        privatekey: privateKey
        
    }

    writeFile(".user.secret", user.username + '\n' + user.publickey + '\n' + user.privatekey, e => {
        if(e) {
            return console.error(e);
        }
        console.log("Secrets exported successfully!");
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let {username, password} = req.body;

        // TODO: save user into DB
    let user: IUser = {username: "un", publickey: "pub", privatekey: "priv"};

};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {

};

export default { validateToken, register, login, getAllUsers};