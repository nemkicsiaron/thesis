import { aggregatorUri } from "../../config/config";
import Category from "../../interfaces/category";

export async function listAllCategories(): Promise<string[]> {
    try {
        const result = await fetch(`${aggregatorUri}/aggreg/allcat`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const categories: Category[] = await result.json();
        console.log(new Date(), "Categories:", categories);
        return categories.map(c => c.name);
    } catch (error) {
        console.error(error);
        return [];
    }
}
