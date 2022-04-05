import Category from "./category"

export default interface Post {
    title: string,
    category: string,
    publish: boolean,
    description?: string,
    created: Date,
    author: string,
    signature: string,
    categoryRelation: Category
}