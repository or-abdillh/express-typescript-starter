import { EmailController } from "@src/controllers/email.controller"
import { Express } from "express"

export const emailRoute = (email: Express): void => {

    email.route("/email")
        .post(EmailController.sending)
}