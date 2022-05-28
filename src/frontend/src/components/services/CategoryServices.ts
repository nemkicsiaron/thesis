import { aggregatorUri } from "../../util/config";
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
        const categories: string[] = await result.json();
        ///console.log(new Date(), "Categories:", categories);
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
}
