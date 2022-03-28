import Category from "./category"

export default interface IServer {
    address: string,
    categories: Category[],
    activesince: Date
};