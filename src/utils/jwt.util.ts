import { useJWTConfig } from "@config/jwt.config"
import jwt from "jsonwebtoken"
import { Request } from "express"

// initial
const config = useJWTConfig()

// types
type AuthCredential = {
    email: string,
    name: string,
    picture: string,
    password?: string,
}

// generating JWT token
export const createToken = (payload: any): string => {

    return jwt.sign(payload, config.secretKey, { expiresIn: config.expiresIn })
}

// extract JWT token from Auth headers
export const extractJWTFromAuthHeader = (req: Request): AuthCredential | null => {

    // Auth header is exists
    if (req.headers.authorization) {

        // get token from split the string with prefix "Bearer"
        const authToken = req.headers.authorization.split("Bearer").reverse()[0].trim()

        try {
            // decode auth token
            return jwt.verify(authToken, config.secretKey) as AuthCredential
        } catch (err: any) { return null }
    } else { return null }
}