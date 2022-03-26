import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs"
import signJWT from "../functions/signJWT";
import IUser from "../interfaces/user";
import { TokenExpiredError } from "jsonwebtoken";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, "Token validated");
    return res.status(200).json({
        message: "Authorized"
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    bcryptjs.hash(password, 69, (hashError, hash) => {
        if(hashError)
        {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        // TODO: save user into DB
        
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