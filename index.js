import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { route as userRoute } from "./routes/userRoute.js"
import { route as orderRoute } from "./routes/orderRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json())
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173' 
}));

const PORT = process.env.PORT || 7000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(() => {
    console.log("DB id successfully connected")
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
}).catch((error) => { 
    console.log(error)
})

app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)