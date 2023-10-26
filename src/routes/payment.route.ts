import { NotificationController } from "@src/controllers/payment/notification.controller"
import { SnapController } from "@src/controllers/payment/snap.controller"
import { Express } from "express"

export const paymentRoute = (payment: Express): void => {

    payment.route("/payment/snap")
        .post(SnapController.create)

    payment.route("/payment/notification")
        .post(NotificationController.receive)
}