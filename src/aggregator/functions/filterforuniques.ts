import Post from "../interfaces/post";

export default function filterForUniques(posts: Post[]): Post[] {
    const uniquePosts: Post[] = [];
    posts.forEach((post: Post) => {
        if (!uniquePosts.some((uniquePost: Post) => uniquePost.signature === post.signature)) {
            uniquePosts.push(post);
        }
    });
    return uniquePosts;
}