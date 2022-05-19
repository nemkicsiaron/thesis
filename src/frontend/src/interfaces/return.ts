import Post from "./post";

export default interface APIReturn {
    posts: Post[],
    error: boolean,
    message: string
}