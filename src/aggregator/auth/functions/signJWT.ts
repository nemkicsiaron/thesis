import jwt from "jsonwebtoken"
import IUser from "../interfaces/user"

const NAMESPACE = "Auth";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + 3_600 * 100_000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1_000);

    console.log(NAMESPACE + ` - Attempting to sign token for ${user.username}`);

    try {
        jwt.sign({
            username: user.username
        },
        "supersecret",
        {
            issuer: "KecskeIssuer",
            algorithm: "HS256",
            expiresIn: expirationTimeInSeconds
        },
        (err, token) => {
            if(err) {
                callback(err, null);
            }
            else if(token) {
                callback(null, token);
            }
        });
    } catch (error: any) {
        console.error(NAMESPACE + " - " + error.message + error);
        callback(error, null);
    }
}

export default signJWT;