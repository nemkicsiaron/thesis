import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    if(token) {
        jwt.verify(token, "supersecret", (error, decoded) => {
            if(error) {
                res.status(401).json({
                    message: error.message,
                    error: error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: "Unauthorized access error"
        });
    }
}