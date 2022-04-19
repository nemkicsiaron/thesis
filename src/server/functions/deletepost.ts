import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deletepost(title: string, author: string, signature?: string) {

    try {
        await prisma.post.deleteMany({
            where: {
            title,
            author,
            signature,
            },
        });
        return {
            status: "success",
            message: "Post deleted",
        };
    } catch (error: any) {
        console.error(error);
        return {
            status: "error",
            message: error.message,
        };
    }

}