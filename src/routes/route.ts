import { IndexController } from "@src/controllers/index.controller"
import { Express } from "express"
import { postRoute } from "./post.route"

export const route = (app: Express): void => {

    app.route("/")
        .get(IndexController.index)

    // routes: post resource
    postRoute(app)

    app.use(IndexController.fallback)

}