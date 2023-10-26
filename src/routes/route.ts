import { IndexController } from "@src/controllers/index.controller"
import { Express } from "express"
import { emailRoute } from "./email.route"

export const route = (app: Express): void => {

    app.route("/")
        .get(IndexController.index)

    // routes: email
    emailRoute(app)

    app.use(IndexController.fallback)

}