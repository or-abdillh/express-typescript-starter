import { LoginController } from "@src/controllers/auth/login.controller"
import { useValidator } from "@src/middleware/validator.middleware"
import { Express } from "express"

export const authRoute = (auth: Express): void => {

    auth.route("/auth/login")
        .post(useValidator(...LoginController.rules), LoginController.index)
}