import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function findpost(searchterm: string, minprice: string, maxprice: string, author: string, signature: string): Promise<Post[] | null> {
    var res;
    if (author.length > 0) {
        res = await prisma.post.findMany({
            where: {
                author: author,
            }
        });
    } else if(signature) {
        res = await prisma.post.findMany({
            where: {
                published: true,
                signature: signature
            }

        });
    }
    else {
        res = await prisma.post.findMany({
            where: {
                published: true
            }
        });
    }

    return res.filter(p => p.title.toLowerCase().includes(searchterm.toLowerCase()) &&
             parseInt(p.price) >= (parseInt(minprice) || 0) &&
             parseInt(p.price) <= (parseInt(maxprice) || Number.MAX_SAFE_INTEGER) &&
             p.signature.includes(signature));
}