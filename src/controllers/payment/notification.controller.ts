import { Request, Response } from "express"
import { createHash } from "crypto"
import { useMidtransConfig } from "@config/midtrans.config"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"

// initial
const midtrans = useMidtransConfig()

// types 
interface RequestNotification extends Request {
    body: {
        order_id: string,
        gross_amount: number,
        status_code: number,
        signature_key: string,
        transaction_status: "capture" | "settlement" | "pending" | "deny" | "cancel" | "failure" | "expire"
    }
}

type Transaction = {
    order_id: string
    status_code: number
    gross_amount: number
}

// handler: signature key validation
const isSignatureKeyValid = (transaction: Transaction, signature_key: string): boolean => {

    // stringify transaction
    const stringify: string = transaction.order_id + transaction.status_code + transaction.gross_amount + midtrans.serverKey

    // create hash from stringify
    const hashed = createHash("sha512").update(stringify).digest("hex")

    // comparing
    if (hashed === signature_key) return true
    else return false
}

// main
export const NotificationController = {

    // handler: receive notification from midtran
    async receive(req: RequestNotification, res: Response): Promise<Response | void> {

        // parse body
        const { order_id, gross_amount, status_code, signature_key, transaction_status } = req.body

        // invalid signature key
        if (!isSignatureKeyValid({ order_id, gross_amount, status_code }, signature_key)) {
            return res.status(HttpStatusCode.BAD_REQUEST).send({
                status: false,
                code: HttpStatusCode.BAD_REQUEST,
                message: "invalid signature key"
            } as JSONResponse)
        }

        if (transaction_status === "settlement" || transaction_status === "capture") {

            // OK
            return res.status(HttpStatusCode.CREATED).send({
                status: true,
                code: HttpStatusCode.CREATED,
                message: "payment for order ID " + order_id + " succesfully"
            } as JSONResponse)
        }

        return res.status(HttpStatusCode.OK).send({
            status: true,
            code: HttpStatusCode.OK,
            message: "transaction status updated to " + transaction_status + " for order ID " + order_id
        } as JSONResponse)
    }
}