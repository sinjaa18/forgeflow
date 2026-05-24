import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

import authRoutes from "./routes/authRoutes.js"
import leadRoutes from "./routes/leadRoutes.js"
import activityRoutes from "./routes/activityRoutes.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173", "https://forgeflow-puce.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("API Running")
})
app.use("/api/auth",authRoutes)
app.use("/api/leads",leadRoutes)
app.use("/api/activity",activityRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(5000,()=>{
        console.log("Sever running")
    })
})

