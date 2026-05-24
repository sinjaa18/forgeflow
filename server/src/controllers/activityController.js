import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activities);
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export default getActivities