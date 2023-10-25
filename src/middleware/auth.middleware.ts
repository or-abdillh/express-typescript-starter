import { Request, Response, NextFunction } from "express"
import { extractJWTFromAuthHeader } from "@src/utils/jwt.util"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"

// main
export const useAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // get user credential from Auth header
    const credential = extractJWTFromAuthHeader(req)

    // invalid credential
    if (!credential) {
        return res.status(HttpStatusCode.FORBIDDEN).send({
            status: false,
            code: HttpStatusCode.FORBIDDEN,
            message: "user doesn't have a valid credential to access this resource"
        } as JSONResponse)
    }

    // valid credential
    next()
}