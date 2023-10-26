import { useMidtransConfig } from "@config/midtrans.config"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"
import { faker } from "@faker-js/faker"

const { Snap } = require("midtrans-client")

// initial
const midtrans = useMidtransConfig()

const snap = new Snap({
    isProduction: midtrans.isProduction,
    serverKey: midtrans.serverKey,
    clientKey: midtrans.clientKey
})

// types
type SnapResponse = {
    token: string,
    redirect_url: string
}

type SnapPayload = {
    transaction_details: {
        order_id: string,
        gross_amount: number
    },
    customer_details: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        address: string
    }
}

// main
export const SnapController = {

    // handler: create snap token
    async create(req: Request, res: Response): Promise<Response | void> {

        // create payload
        const payload: SnapPayload = {
            transaction_details: {
                order_id: faker.string.uuid(),
                gross_amount: faker.number.int({ max: 5_000_000 })
            },
            customer_details: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress({ useFullAddress: true })
            }
        }

        try {
            // create snap
            snap.createTransaction(payload)
                .then((transaction: SnapResponse) => {

                    // redirect
                    // return res.redirect(transaction.redirect_url)

                    // return snap token
                    return res.status(HttpStatusCode.CREATED).send({
                        status: true,
                        code: HttpStatusCode.CREATED,
                        data: { transaction }
                    } as JSONResponse)
                })

        } catch (err: any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                status: false,
                code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "failed to create snap payment",
                error: err
            } as JSONResponse)
        }
    }
}