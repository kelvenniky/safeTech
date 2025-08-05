import emergencyModel from "../models/emergencyModel.js";

async function userEmergency(req, res) {
    try {
      const { userId } = req.params; // Get userId from params
      
      const emergencies = await emergencyModel.find({ userId }); // Fetch all emergencies for the user
  
      res.json({
        message: "Emergencies retrieved successfully",
        error: false,
        success: true,
        data: emergencies,
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }

  export default userEmergency