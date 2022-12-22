import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import morgan from 'morgan'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
import { globalError } from './src/services/asyncHandler.js'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
const baseUrl = process.env.BASEURL
//convert Buffer Data
app.use(express.json())
app.use(morgan())
//Setup API Routing 
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/product`, indexRouter.productRouter)
app.use(`${baseUrl}/category`, indexRouter.categoryRouter)
app.use(`${baseUrl}/subCategory`, indexRouter.subcategoryRouter)
app.use(`${baseUrl}/reviews`, indexRouter.reviewsRouter)
app.use(`${baseUrl}/coupon`, indexRouter.couponRouter)
app.use(`${baseUrl}/cart`, indexRouter.cartRouter)
app.use(`${baseUrl}/order`, indexRouter.orderRouter)
app.use(`${baseUrl}/brand`, indexRouter.branRouter)

app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})



app.use(globalError)

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))