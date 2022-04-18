import { Post, PrismaClient } from "@prisma/client";
import listallcat from "./listallcat";

const prisma = new PrismaClient();

export default async function newpost(post: Post): Promise<Post | null> {

    try {
        await prisma.category.upsert({
            where: { name: post.category },
            update: {},
            create: { name: post.category }
        });

        const newPost: Post = await prisma.post.create({
            data: {
                title: post.title,
                category: post.category,
                published: post.published,
                description: post.description,
                price: post.price,
                created: post.created,
                author: post.author,
                signature: post.signature
            },
        });
        return newPost;
    } catch (error) {
        console.error(error);
        return null;
    }
}