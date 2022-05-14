import { aggregatorUri } from "../../config/config";
import Category from "../../interfaces/category";

export async function listAllCategories(server?: string): Promise<string[]> {
    try {
        const result = await fetch(`${aggregatorUri}/aggreg/allcat/?` + new URLSearchParams({
            server: server ?? ""
        }), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        const categories: Category[] = await result.json();
        ///console.log(new Date(), "Categories:", categories);
        return categories.map(c => c.name);
    } catch (error) {
        console.error(error);
        return [];
    }
}
