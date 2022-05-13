export default interface Post {
    title: string,
    category: string,
    published: boolean,
    price: string,
    description?: string,
    created: Date,
    author: string,
    signature?: string
}