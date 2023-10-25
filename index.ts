import "module-alias/register"
import express, { Express } from "express"
import cors from "cors"
import { useAppConfig } from "@config/app.config"
import { route } from "@src/routes/route"
import morgan from "morgan"

// initial
const app: Express = express()
const config = useAppConfig()

// setup
app.use(cors(config.cors))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

route(app)

// running
function main(): void {
    try {
        app.listen(config.app.port, (): void => {
            console.log(`⚡️ [SERVER]: Server running at ${config.app.url}`)
            console.log(`🚀 [SERVER]: Hello World from ${config.app.name}`)
        })
    } catch (err: any) {
        console.error(err)
        process.exit(1)
    }
}

main()