import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Response } from "express"
import { Prisma } from "prisma/prisma-client"

export const useException = (err: any, res: Response): Response | void => {

    if (err instanceof (Prisma.PrismaClientValidationError,
        Prisma.PrismaClientInitializationError,
        Prisma.PrismaClientUnknownRequestError,
        Prisma.PrismaClientRustPanicError)) {

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            code: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: "Prisma Exception",
            error: err
        } as JSONResponse)
    } else {

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            code: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: "Application Exception",
            error: err
        } as JSONResponse)
    }
}