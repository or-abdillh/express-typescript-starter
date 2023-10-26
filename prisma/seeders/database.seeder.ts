import { commentSeeder } from "./comment.seeder"
import { postSeeder } from "./post.seeder"
import { profileSeeder } from "./profile.seeder"
import { userSeeder } from "./user.seeder"

(async function () {
    // running all seeder
    await userSeeder()
    await profileSeeder()
    await postSeeder()
    await commentSeeder()
})()