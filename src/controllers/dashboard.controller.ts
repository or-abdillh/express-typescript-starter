import { useAppConfig } from "@config/app.config"
import { extractJWTFromAuthHeader } from "@src/utils/jwt.util"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"

// initial
const config = useAppConfig()

// main
export const DashboardController = {

    index(req: Request, res: Response): Response {

        // get user
        const user = extractJWTFromAuthHeader(req)

        return res.status(HttpStatusCode.OK).send({
            status: true,
            code: HttpStatusCode.OK,
            message: "Wellcome to our Dashboard - " + config.app.name,
            data: { user }
        } as JSONResponse)
    }
}