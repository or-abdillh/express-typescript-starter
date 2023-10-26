import { faker } from "@faker-js/faker"
import { PrismaClient } from "prisma/prisma-client"

const { postComment: Comment, post: Post, user: User } = new PrismaClient()

export const commentSeeder = async (): Promise<void> => {

    const comments = []

    const users = await User.findMany()
    const posts = await Post.findMany()

    for (const user of users) {
        for (const post of posts) {
            comments.push({
                userId: user.id,
                postId: post.id,
                content: faker.lorem.paragraphs(5),
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }

    console.log("running comment seeder ...")

    await Comment.createMany({
        data: comments
    })

    console.log("comment seeder completed")
}