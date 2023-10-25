import { IndexController } from "@src/controllers/index.controller"
import { Express } from "express"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard.route"

export const route = (app: Express): void => {

    app.route("/")
        .get(IndexController.index)

    // routes: user authentication
    authRoute(app)

    // routes: user dashboard
    dashboardRoute(app)

    app.use(IndexController.fallback)
}
