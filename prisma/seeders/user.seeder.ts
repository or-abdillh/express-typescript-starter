import { faker } from "@faker-js/faker"
import { createHash } from "crypto"
import { PrismaClient } from "prisma/prisma-client"

const { user: User } = new PrismaClient()

export const userSeeder = async (): Promise<void> => {

    // create fake users
    const users = []

    for (let x = 0; x < 25; x++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: createHash("sha512").update("password").digest("base64"),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    console.log("running user seeder ...")

    await User.createMany({
        data: users
    })

    console.log("user seeder completed")
}