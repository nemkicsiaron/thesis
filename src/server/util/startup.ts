import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const defCats = ["Járművek", "Elektronika", "Könyvek", "Kisállatok", "Sport és szabadidő", "Divat és szépségápolás", "Bútorzat", "Ingatlan", "Szolgáltatások", "Egyéb"].sort();

export default async function(cats?: string[], posts?: Post[]): Promise<void> {
    console.log("Starting up...");
    if(await prisma.category.findMany()) {
        console.log("Categories already exist");
        return;
    }

    const categories = cats || defCats;

    try {
        Promise.all(categories.map(async c => {
            await prisma.category.create({
                data: {
                    name: c
                }
            });
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