import Lead from "../models/Lead.js"

export const createLead=async(req,res)=>{
    try{
        const lead = await Lead.create({
            ...req.body,
            assignedTo: req.user.id
        })
        res.status(201).json(lead)
    }catch(err){
        res.status(500).json({
            msg: err.message
        })
    }
}

export const getLeads=async(req,res)=>{
    try{
        const leads = await Lead.find().populate("assignedTo", "name email")
        res.json(leads)
    }catch(err) {
        res.status(500).json({
            msg: err.message
        })
    }
}