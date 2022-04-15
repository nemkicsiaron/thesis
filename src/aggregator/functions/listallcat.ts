import Category from "../interfaces/category";
import IServer from "../interfaces/servers";

export default async function listallcat(serveraddr?: string) : Promise<Category[]> {
    if(!serveraddr) throw new Error("No server given");

    var response = await fetch(serveraddr + "/api/allcat");
    return await response.json();
}