import mongoose from "mongoose";

const userSchemma = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "bda"
    },
},
    { timestamps: true }
)

export default mongoose.model("User", userSchemma)