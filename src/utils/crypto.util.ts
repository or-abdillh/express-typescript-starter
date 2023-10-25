import { createHash } from "crypto"

// inner function
const generateHash = (secret: string): string => {

    return createHash("sha512")
        .update(secret)
        .digest("base64")
}

// exported function
export const compareHash = (secret: string, hashed: string): boolean => {

    if (hashed === generateHash(secret)) return true

    return false
}