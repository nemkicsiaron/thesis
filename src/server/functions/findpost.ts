import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function find(search: string, category?: string, minprice?: string, maxprice?: string): Promise<Post[] | null> {

    var res = await prisma.post.findMany({
        where: {
            published: true
        }
    });

    if (category) res = res.filter(p => p.category === category);

    const sureminprice = minprice ? parseInt(minprice) : 0;
    const suremaxprice = maxprice ? parseInt(maxprice) : Number.MAX_SAFE_INTEGER;

    return res.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) &&
             parseInt(p.price) >= sureminprice &&
             parseInt(p.price) <= suremaxprice);
}