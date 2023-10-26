import { faker } from "@faker-js/faker"
import { PrismaClient } from "prisma/prisma-client"

const { post: Post } = new PrismaClient()

export const postSeeder = async (): Promise<void> => {

    const posts = []

    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 5; y++) {
            posts.push({
                userId: x + 1,
                title: faker.lorem.sentence({ min: 3, max: 10 }),
                content: faker.lorem.sentences(30),
                isPublished: faker.datatype.boolean(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }

    console.log("running post seeder ...")

    await Post.createMany({
        data: posts
    })

    console.log("post seeder completed")
}