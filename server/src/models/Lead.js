import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    contactPerson:String,
    email:String,
    phone:String,
    status:{
        type:String,
        enum: ["New","Contacted","Negotiation","Proposal","Won","Lost"],
        default:"New"
    },
    dealValue: {
        type: Number,
        default: 0
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    notes: String,
    nextFollowup: Date
}, { timestamps: true })

export default mongoose.model("Lead",leadSchema)