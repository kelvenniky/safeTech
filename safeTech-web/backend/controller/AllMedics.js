import User from "../models/userModel.js";

const AllMedics = async (req, res) => {
    try {
        const allMedics = await User.find({ userType: "medic" });

        return res.status(200).json({
            data: allMedics,
            message: "Retrieved all medics successfully.",
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error fetching medics:", err); // Log the error for debugging

        return res.status(500).json({
            message: err.message || "An error occurred while fetching medics.",
            error: true,
            success: false,
        });
    }
};

export default AllMedics;