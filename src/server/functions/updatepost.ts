import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updatepost(updatedpost: Post, oldsignature: string) {
    try{
        await prisma.post.upsert({
            where: {
                signature: oldsignature
            },
            update: {...updatedpost},
            create: {...updatedpost}
        });
        return {
            status: "success",
            message: "Post updated successfully"
        };
    } catch(error: any) {
        console.error(error);
        return {
            status: "error",
            message: error.message
        };

    }
}
