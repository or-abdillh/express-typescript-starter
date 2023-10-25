import { useAppConfig } from "@config/app.config"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"

const config = useAppConfig()

export const IndexController = {

    index(req: Request, res: Response): Response | void {

        return res.status(HttpStatusCode.OK).send({
            status: true,
            code: HttpStatusCode.OK,
            message: "Hello world from " + config.app.name
        } as JSONResponse)
    },

    fallback(req: Request, res: Response): Response | void {

        return res.status(HttpStatusCode.NOT_FOUND).send({
            status: false,
            code: HttpStatusCode.NOT_FOUND,
            message: "route not found",
            error: {
                path: req.path,
                method: req.method,
                baseURL: req.baseUrl
            }
        } as JSONResponse)
    }
}