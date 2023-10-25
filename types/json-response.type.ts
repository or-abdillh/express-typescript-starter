import { HttpStatusCode } from "@type/http-status.enum"

export type JSONResponse = {
    status: boolean,
    code: HttpStatusCode,
    message?: string,
    data?: any,
    error?: any
}