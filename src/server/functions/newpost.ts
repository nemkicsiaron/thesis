import { Post, PrismaClient } from "@prisma/client";
import APIReturn from "../util/return";

const prisma = new PrismaClient();

export default async function newpost(post: Post): Promise<APIReturn> {

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
        return {
            posts: [newPost],
            error: false,
            message: "Post created successfully"
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