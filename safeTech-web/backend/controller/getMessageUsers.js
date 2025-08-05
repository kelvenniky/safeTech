import userModel from '../models/userModel.js'

// Controller to get users excluding the logged-in user and those with userType "admin"
const getMessageUsers = async (req, res) => {
  console.log("user.iddddd", req.userId);

  const loggedInUserId = req.userId; // Get the logged-in user's ID from the request parameters

  try {
    const users = await userModel.find({
      userType: { $ne: "admin" } // Exclude users with userType "admin"


      
    });

    res.status(200).json(users); // Send the list of users back as JSON
  } catch (err) {
    console.error("Error retrieving users", err); // Log the error
    res.status(500).json({ message: "Error retrieving users" }); // Send an error response
  }
};

export default getMessageUsers;