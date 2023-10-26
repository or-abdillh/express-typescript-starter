import { PostController } from "@src/controllers/post.controller"
import { Express } from "express"

export const postRoute = (userPost: Express): void => {

    userPost.route("/post")
        .get(PostController.index)
} 