import { CorsOptions } from "cors"
import dotenv from "dotenv"

// setup
dotenv.config()

export const useAppConfig = () => {

    return {
        app: {
            name: process.env.APP_NAME?.split("_").join(" "),
            url: process.env.APP_URL,
            port: process.env.PORT ?? 8000,
            clientUrl: process.env.CLIENT_URL,
        },

        cors: {
            origin: [process.env.CLIENT_URL]
        } as CorsOptions
    }
}