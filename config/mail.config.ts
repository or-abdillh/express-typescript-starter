import dotenv from "dotenv"

dotenv.config()

export const useMailConfig = () => {
    return {
        secure: false,
        from: process.env.MAIL_FROM,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            password: process.env.MAIL_AUTH_PASSWORD,
        }
    }
}