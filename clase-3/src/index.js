import express from "express"
import dotenv from "dotenv"
import sessionsRouter from "./routes/sessions.router.js"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
mongoose.connect(process.env.MONGO_URI)

app.use("/api/sessions",sessionsRouter)

app.listen(process.env.PORT,()=> console.log("server in port: " + process.env.PORT))