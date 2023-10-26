import { IndexController } from "@src/controllers/index.controller"
import { Express } from "express"
import { paymentRoute } from "./payment.route"

export const route = (app: Express): void => {

    app.route("/")
        .get(IndexController.index)

    // routes: payment with midtrans
    paymentRoute(app)

    app.use(IndexController.fallback)

}