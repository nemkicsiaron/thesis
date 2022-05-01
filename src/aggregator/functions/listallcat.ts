import Category from "../interfaces/category";
import IServer from "../interfaces/servers";

export default async function listallcat(serveraddr?: string) : Promise<Category[]> {
    if(serveraddr) {
        var response = await fetch(serveraddr + "/api/allcat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                }
            });
        return await response.json();
    }
    else {
        var allCats: Category[] = []
        try {

        } catch (error) {
            console.error(error);
        }
        finally {
            return allCats
        }
    }
}