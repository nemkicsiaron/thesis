import { PrismaClient } from "@prisma/client";
import APIReturn from "../util/return";

const prisma = new PrismaClient();

export default async function findpost(searchterm: string, minprice: string, maxprice: string, author: string, signature: string): Promise<APIReturn> {
    var res;
    try {

        if (author.length > 0) {
            console.log("authored search");
            res = await prisma.post.findMany({
                where: {
                    author: author,
                }
            });
        } else if(signature) {
            console.log("signature search");
            res = await prisma.post.findMany({
                where: {
                    published: true,
                    signature: signature
                }

            });
        }
        else {
            console.log("general search");
            res = await prisma.post.findMany({
                where: {
                    published: true
                }
            });
        }

        const posts = res.filter(p => p.title.toLowerCase().includes(searchterm.toLowerCase()) &&
                 parseInt(p.price) >= (parseInt(minprice) || 0) &&
                 parseInt(p.price) <= (parseInt(maxprice) || Number.MAX_SAFE_INTEGER) &&
                 p.signature.includes(signature));

        return {
            posts: posts,
            error: false,
            message: "Success"
        };
    } catch (error: any) {
        console.error(error);
        return {
            posts: [],
            error: true,
            message: error.message || error
        };
    }
}