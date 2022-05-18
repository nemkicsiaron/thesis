import { Post, PrismaClient } from "@prisma/client";
import APIReturn from "../util/return";

const prisma = new PrismaClient();

export default async function updatepost(updatedpost: Post, oldsignature: string): Promise<APIReturn> {
    try{
        const post = await prisma.post.upsert({
            where: {
                signature: oldsignature
            },
            update: {...updatedpost},
            create: {...updatedpost}
        });
        return {
            posts: [post],
            error: false,
            message: "Post updated successfully"
        };
    } catch(error: any) {
        console.error(error);
        return {
            posts: [],
            error: true,
            message: error.message
        };

    }
}
