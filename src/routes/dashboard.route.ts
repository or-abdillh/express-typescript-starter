import { DashboardController } from "@src/controllers/dashboard.controller"
import { useAuthMiddleware } from "@src/middleware/auth.middleware"
import { Express } from "express"

export const dashboardRoute = (dashboard: Express): void => {

    // middlewares
    dashboard.use("/dashboard", useAuthMiddleware)

    dashboard.route("/dashboard")
        .get(DashboardController.index)
}