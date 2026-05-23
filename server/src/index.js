import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

import authRoutes from "./routes/authRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API Running")
})
app.use("/api/auth",authRoutes)
app.use("/api/leads",leadRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(5000,()=>{
        console.log("Sever running")
    })
})

