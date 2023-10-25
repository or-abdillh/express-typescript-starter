import { compareHash } from "@src/utils/crypto.util"
import { createToken } from "@src/utils/jwt.util"
import { FieldError } from "@type/field-error.type"
import { HttpStatusCode } from "@type/http-status.enum"
import { JSONResponse } from "@type/json-response.type"
import { Request, Response } from "express"
import { ValidationChain, body } from "express-validator"

// types
interface RequestLogin extends Request {
    body: {
        email: string,
        password: string
    }
}

// rules validation
const rules: ValidationChain[] = [
    body("email")
        .notEmpty().withMessage("missing required body 'email'").bail()
        .isEmail().withMessage("incorrect email format"),

    body("password")
        .notEmpty().withMessage("missng required body 'password'")
]

// dummy credential
const credential = {
    name: "Jonathan Doe",
    picture: "https://ui-avatars.com/api/?name=Jonathan+Doe",
    email: "user@express-typescript.com",
    password: "sQnzu7wkTrgkQZF+0G1hi5AI3Qmzvv0bXgc5THBqi7mAsdd4Xll27ASbRt9fEyavWi6m0QP9B8lThf+rDKy8hg==" // equal to "password"
}

// main 
export const LoginController = {

    // validator
    rules,

    // handler: user login with email and password
    index(req: RequestLogin, res: Response): Response | void {

        // parse body
        const { email, password } = req.body

        // credential checking
        if (email !== credential.email) {

            // invalid email
            return res.status(HttpStatusCode.NOT_FOUND).send({
                status: false,
                code: HttpStatusCode.NOT_FOUND,
                message: "invalid credential",
                error: {
                    email: {
                        msg: "user not found with this email",
                        value: email
                    } as FieldError
                }
            } as JSONResponse)
        }

        // email is valid
        if (email === credential.email) {

            // invalid password
            if (!compareHash(password, credential.password)) {
                return res.status(HttpStatusCode.FORBIDDEN).send({
                    status: false,
                    code: HttpStatusCode.FORBIDDEN,
                    message: "invalid credential",
                    error: {
                        password: {
                            msg: "password mismatch",
                            value: password
                        } as FieldError
                    }
                } as JSONResponse)
            }

            // create JWT token
            const token: string = createToken(credential)

            // OK
            return res.status(HttpStatusCode.OK).send({
                status: true,
                code: HttpStatusCode.OK,
                data: { token }
            } as JSONResponse)
        }

    }
}