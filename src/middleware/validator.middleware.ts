import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response, NextFunction } from "express"
import { validationResult, ValidationChain } from "express-validator"

export const useValidator = (...rules: ValidationChain[]) => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {

        // validate all rule
        Promise.all(rules.map(rule => rule.run(req)))
            .then(() => {

                // catch all validations error
                const validations = validationResult(req)

                if (validations.isEmpty()) next()
                else {
                    return res.status(HttpStatusCode.BAD_REQUEST).send({
                        status: true,
                        code: HttpStatusCode.BAD_REQUEST,
                        message: "validations error",
                        error: validations.mapped()
                    } as JSONResponse)
                }
            })
    }
}
