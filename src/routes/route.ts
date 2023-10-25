import { IndexController } from "@src/controllers/index.controller"
import { Express } from "express"

export const route = (app: Express): void => {

    app.route("/")
        .get(IndexController.index)

    app.use(IndexController.fallback)

}