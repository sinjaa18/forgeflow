import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user.id,
    });
    res.status(201).json(lead);
    await Activity.create({
      action: "created a new lead",
      company: lead.company,
      user: req.user.id,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "name email");
    res.json(leads);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(lead);
    await Activity.create({
      action: `moved lead to ${lead.status}`,
      company: lead.company,
      user: req.user.id,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const leads = await Lead.find();
    const totalLeads = leads.length;
    const wonDeals = leads.filter((lead) => lead.status === "Won").length;
    const lostDeals = leads.filter((lead) => lead.status === "Lost").length;
    const revenue = leads
      .filter((lead) => lead.status === "Won")
      .reduce((acc, curr) => acc + curr.dealValue, 0);

    res.json({
      totalLeads,
      wonDeals,
      lostDeals,
      revenue,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};
