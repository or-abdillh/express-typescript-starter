import dotenv from "dotenv"
import { createHash } from "crypto"

// setup
dotenv.config()

export const useJWTConfig = () => {

    return {
        secretKey: createHash("sha512")
            .update(process.env.JWT_SECRET_KEY as string)
            .digest("base64"),

        expiresIn: "9h" // 9 hours
    }
}