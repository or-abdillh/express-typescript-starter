import dotenv from "dotenv"

dotenv.config()

export const useMidtransConfig = () => {

    // production mode ?
    const isProduction: boolean = JSON.parse(process.env.MIDTRANS_IS_PRODUCTION?.toLowerCase()!)

    if (isProduction) {
        return {
            isProduction,
            idMerchant: process.env.MIDTRANS_PROD_ID_MERCHANT,
            clientKey: process.env.MIDTRANS_PROD_CLIENT_KEY,
            serverKey: process.env.MIDTRANS_PROD_SERVER_KEY,
            chargeEnpoint: process.env.MIDTRANS_PROD_CHARGE_ENDPOINT
        }
    } else {
        return {
            isProduction,
            idMerchant: process.env.MIDTRANS_DEV_ID_MERCHANT,
            clientKey: process.env.MIDTRANS_DEV_CLIENT_KEY,
            serverKey: process.env.MIDTRANS_DEV_SERVER_KEY,
            chargeEnpoint: process.env.MIDTRANS_DEV_CHARGE_ENDPOINT
        }
    }
}