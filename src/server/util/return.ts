import { Post } from "@prisma/client";


export default interface APIReturn {
    posts: Post[],
    error: boolean,
    message: string
}