import { useMailConfig } from "@config/mail.config"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"
import { TransportOptions, createTransport } from "nodemailer"

// initial
const mail = useMailConfig()

// types
interface RequestEmail extends Request {
    query: {
        mailto: string
    }
}

// nodemailer: transporter
const options = {
    host: mail.host,
    port: mail.port,
    secure: mail.secure,
    auth: {
        user: mail.auth.user,
        pass: mail.auth.password
    }
} as TransportOptions

const transporter = createTransport(options)

// exported function
export const EmailController = {

    // handler: sending email using params :mailto
    async sending(req: RequestEmail, res: Response): Promise<Response | void> {

        // parse params
        const { mailto } = req.query

        if (!mailto) {
            return res.status(HttpStatusCode.BAD_REQUEST).send({
                status: false,
                code: HttpStatusCode.BAD_REQUEST,
                message: "missing required query '?mailto'"
            } as JSONResponse)
        }

        try {
            // sending
            await transporter.sendMail({
                from: `Express Typescript Starter by or.abdillh <${mail.from}>`,
                subject: "Nodemailer with Express and Typescript",
                to: mailto,
                text: "Hello world"
            })

            // OK
            return res.status(HttpStatusCode.OK).send({
                status: true,
                code: HttpStatusCode.OK,
                message: "succesfully send an email to " + mailto
            } as JSONResponse)

        } catch (err: any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                status: false,
                code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "failed to send email to " + mailto,
                error: err
            } as JSONResponse)
        }
    }
}