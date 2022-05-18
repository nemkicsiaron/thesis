import { PrismaClient } from "@prisma/client";
import APIReturn from "../util/return";

const prisma = new PrismaClient();

export default async function deletepost(title: string, author: string, signature?: string): Promise<APIReturn> {

    try {
        const post = await prisma.post.deleteMany({
            where: {
            title,
            author,
            signature,
            },
        });
        return {
            posts: [post],
            error: false,
            message: "Post deleted successfully"
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