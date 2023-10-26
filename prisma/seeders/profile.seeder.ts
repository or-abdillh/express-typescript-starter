import { faker } from "@faker-js/faker"
import { PrismaClient } from "prisma/prisma-client"

const { profile: Profile } = new PrismaClient()

export const profileSeeder = async (): Promise<void> => {

    const profiles = []

    for (let x = 0; x < 25; x++) {

        profiles.push({
            userId: x + 1,
            picture: faker.internet.avatar(),
            address: faker.location.streetAddress({ useFullAddress: true }),
            phoneNumber: faker.phone.number(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    console.log("running profile seeder ...")

    await Profile.createMany({
        data: profiles
    })

    console.log("profile seeder completed")

}