import { Post, PrismaClient } from "@prisma/client";
import listallcat from "../functions/listallcat";

const prisma = new PrismaClient();
const defCats = ["Járművek", "Elektronika", "Könyvek", "Kisállatok", "Sport és szabadidő", "Divat és szépségápolás", "Bútorzat", "Ingatlan", "Szolgáltatások", "Egyéb"].sort();

export default async function(cats?: string[], posts?: Post[]): Promise<void> {
    console.log("Starting up...");
    if((await listallcat()).length > 0) {
        console.log("Categories already exist... aborting");
        return;
    }

    const categories = cats || defCats;

    try {
        Promise.all(categories.map(async c => {
            const newCat = await prisma.category.create({
                data: {
                    name: c
                }
            });
            console.log("Created category: " + newCat.name);
        }));
        console.log("Categories created successfully");
        if(posts) {
            Promise.all(posts.map(async p => {
                await prisma.post.create({
                    data: {
                        ...p
                    }
                });
            }));
            console.log("Posts created successfully");
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Starting up... Done");
}