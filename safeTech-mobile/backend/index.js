const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;

const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoUrl =
  "mongodb+srv://kelvinafutu8as:kev123melvyn@cluster0.z1ijkwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const Message = require("./message");


require("./UserDetails");
const User = mongoose.model("people");
const Emergency = require("./emergency"); 
const Pointer = require("./MapPointers");




app.get("/", (req, res) => {
  res.send({ status: "Started" });
});


//register
app.post("/register", async (req, res) => {
  const { name, email, password, userType, staffID, contact } = req.body;
  console.log(req.body);

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      userType: userType,
      location:{
        latitude:"",
        longitude:""
      },
      staffID:staffID,
      contact:contact,

    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});




//login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const oldUser = await User.findOne({ email: email });

  // If user does not exist, return a specific status
  if (!oldUser) {
    return res.send({
      status: "user_not_found",
      message: "User doesn't exist.",
    });
  }

  // If password matches
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign(
      {
        email: oldUser.email,
        name: oldUser.name,
        userId: oldUser._id,
        userType: oldUser.userType,
      },
      JWT_SECRET
    );
    return res.send({
      status: "ok",
      data: token,
      userType: oldUser.userType,
      userId: oldUser._id,
      userType: oldUser.userType,
    });
  }

  // If password does not match
  return res.send({ status: "error", message: "Incorrect password." });
});



//auth
const authenticateJWT = (req, res, next) => {
  const token = req.body.token;  
  if (!token) {
    return res
      .status(401)
      .send({ status: "error", message: "Token is required." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ status: "error", message: "Invalid token." });
    }

    // Attach the user ID (_id) and other user info to the request object
    req.userId = decoded?.userId;
    req.userType = decoded?.userType; 
    req.user = decoded; 

    next(); 
  });
};



//userdata
app.post("/userdata", authenticateJWT, async (req, res) => {
  try {
    // No need to verify the token again, userId is already attached to req by authenticateJWT
    const userId = req.userId; 
    const useremail = req.user.email; 

    // Fetch user details from database
    const data = await User.findOne({ email: useremail });

    if (!data) {
      return res.send({ status: "error", message: "User not found." });
    }

    // Return user data and userId from the authenticated user
    return res.send({ status: "ok", data: data, userId: userId });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return res.send({ status: "error", data: error.message });
  }
});




//all users
app.get("/get-allusers", async (req, res) => {
  try {
    const data = await User.find({});
    return res.send({ status: "ok", data: data });
  } catch (error) {
    return res.send({ error: "error" });
  }
});




//update your state
app.post("/userState/:id/state", async (req, res) => {
  const userId = req.params.id; 
  const { state } = req.body; 

  // Check if the status is valid
  const validStates = ['offline','busy', 'online',];
  if (!validStates.includes(state)) {
    return res.status(400).send({ status: "error", message: "Invalid state value" });
  }

  try {
    // Find the user by ID and update the status
    const updatedState = await User.findByIdAndUpdate(
      userId,
      { state },
      { new: true } 
    );

    if (!updatedState) {
      return res.status(404).send({ status: "error", message: "User not found" });
    }

    return res.send({ status: "ok", data: updatedState });
  } catch (error) {
    console.error("Error updating user state:", error);
    return res.status(500).send({ status: "error", message: error.message });
  }
});



app.post("/pointer", async (req, res) => {
  const { latitude, longitude, type } = req.body; // Destructure from req.body

  try {
    await Pointer.create({
      latitude,
      longitude,
      type,
    });
    return res.send({ status: "ok", data: "Pointer Created" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.send({ status: "error", data: error.message });
  }
});

app.get("/getPointers", async (req, res) => {
  try {
    const pointers = await Pointer.find(); 
    return res.send({ status: "ok", data: pointers });
  } catch (error) {
    console.error("Error fetching pointers:", error);
    return res.send({ status: "error", data: error.message });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
const posts = await Pointer.find({type:'security'}); 
    return res.send({ status: "ok", data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.send({ status: "error", data: error.message });
  }
});


app.post("/profile", authenticateJWT, async (req, res) => {
  const {
    token,
    contact,
    studentId,
    course,
    residence,
    year,
  } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const currentUserId = user.userId;

    if (!currentUserId) {
      return res.status(403).json({
        message: "Invalid token. User ID not found.",
        error: true,
        success: false,
      });
    }

    const updateData = { contact, studentId, course, residence, year };

    const updatedUser = await User.findByIdAndUpdate(currentUserId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Profile updated successfully.",
      data: updatedUser,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(400).json({
      message: err.message || "An error occurred while updating the profile.",
      error: true,
      success: false,
    });
  }
});

//emergency request
app.post("/emergency", authenticateJWT, async (req, res) => {
  const { token, location, address,closestMedicId, closestMedicName } = req.body; 

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    const userName = user.name;
    const userId = user.userId; 

    // Extract user name from the token

    // Log to verify values
    console.log("Decoded user from token:", user); 

    // Create a new emergency record
    const emergency = new Emergency({
      userId: userId,
      userEmail,
      userName, 
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      address,
      hospitalAddress:"",
      hospitalLocation: {
        latitude: "",
        longitude: "",
      },
      status:"pending",
      closestMedicId,
      closestMedicName:""
    });

    await emergency.save();
    return res.send({ status: "ok", data: emergency });
  } catch (error) {
    console.error("Error saving emergency request:", error);
    return res.send({ status: "error", data: error.message });
  }
});




//get all emergencies
app.get("/emerg", async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });; 
    return res.send({ status: "ok", data: emergencies });
  } catch (error) {
    console.error("Error fetching emergencies:", error);
    return res.send({ status: "error", data: error.message });
  }
});


app.get("/count-emerg", async (req,res)=>{
  try {
    
    const count = await Emergency.countDocuments()

    res.json({
      data:{
        count:count
      }
    })

  } catch (error) {
    console.error("Error counting emergency:", error);
    return res.send({ status: "error", data: error.message });
  }
})




//update emergency status
app.post("/emergency/:id/status",  async (req, res) => {
  const { id } = req.params; 
  const { status } = req.body; 

  // Check if the status is valid
  const validStatuses = ['pending', 'accepted', 'dispatched', 'arrived', 'hospital','enroute', 'completed'];
  if (!validStatuses.includes(status)) {
      return res.status(400).send({ status: "error", message: "Invalid status value" });
  }

  try {
      // Find the emergency by ID and update the status
      const updatedEmergency = await Emergency.findByIdAndUpdate(
          id,
          { status },
          { new: true } 
      );

      if (!updatedEmergency) {
          return res.status(404).send({ status: "error", message: "Emergency not found" });
      }

      return res.send({ status: "ok", data: updatedEmergency });
  } catch (error) {
      console.error("Error updating emergency status:", error);
      return res.status(500).send({ status: "error", message: error.message });
  }
});






//my emergencies
// index.js (Backend)
app.get("/my-emergencies", async (req, res) => {
  const { userId } = req.query;

  try {
    const emergencies = await Emergency.find({
      closestMedicId: userId, 
    }).sort({ createdAt: -1 });

    res.status(200).json(emergencies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching emergencies", error });
  }
});




//update location 
app.post("/add-location/:id/location",  async (req, res) => {
  const { id } = req.params; 
  const { location } = req.body; 

  try {
      // Find the emergency by ID and update the status
      const addLocation = await User.findByIdAndUpdate(
          id,
          { location},
          { new: true } 
      );

      if (!addLocation) {
          return res.status(404).send({ status: "error", message: "User not found" });
      }

      return res.send({ status: "ok", data: addLocation });
  } catch (error) {
      console.error("Error updating location:", error);
      return res.status(500).send({ status: "error", message: error.message });
  }
});




// Get user details by ID for maps
app.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




//get that emergency
app.get('/get-emergency/:id', async (req, res) => {
  try {
      const emergency = await Emergency.findById(req.params.id);
      if (!emergency) {
          return res.status(404).json({ message: 'emergency not found' });
      }
      res.json(emergency);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




///deletttteee
app.delete('/emergencies', async (req, res) => {
  try {
    const result = await Emergency.deleteMany({ status: 'accepted' });
    res.status(200).json({ message: `${result.deletedCount} emergencies deleted.` });
  } catch (error) {
    console.error("Error deleting emergencies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




//allemergencies
app.get('/all-emerg' , async(req,res)=>{
  try {
    const emerg = await Emergency.find()
   return res.send({ status:'ok' ,data:emerg})
  } catch (error) {
    console.log("error in fecthing emergencies", ertror)
  }
})




//add hospital
app.post("/add-hospLocation/:id/location", async (req, res) => {
  const { id } = req.params; 
  const { hospitalAddress, hospitalLocation } = req.body; 

  try {
    // Find the emergency by ID and update the hospital address and location
    const updatedEmergency = await Emergency.findByIdAndUpdate(
      id,
      {
        hospitalAddress,
        hospitalLocation,
      },
      { new: true } 
    );

    if (!updatedEmergency) {
      return res.status(404).send({ status: "error", message: "Emergency not found" });
    }

    return res.send({ status: "ok", data: updatedEmergency });
  } catch (error) {
    console.error("Error updating location:", error);
    return res.status(500).send({ status: "error", message: error.message });
  }
});




//endpoint to fetch all users currently logged in apart from medic1 for chats
app.get("/get-users/", (req, res) => {
  const loggedInUserId = req.params.userId; 

  User.find({ 
    userType: "admin" 
  })
    .then((users) => {
      res.status(200).json(users); 
    })
    .catch((err) => {
      console.error("Error retrieving users", err); 
      res.status(500).json({ message: "Error retrieving users" }); 
    });
});




//get add medics
app.get("/medics", (req, res) => {

  User.find({
    userType: "medic", 
    state:"online"
  })
    .then((medic) => {
      res.status(200).json(medic); 
    })
    .catch((err) => {
      console.error("Error retrieving medics", err); 
      res.status(500).json({ message: "Error retrieving medics" }); 
    });
});




//get all medics
app.get("/allmedics", (req, res) => {

  User.find({
    userType: "medic", 
  })
    .then((medic) => {
      res.status(200).json(medic); 
    })
    .catch((err) => {
      console.error("Error retrieving medics", err); 
      res.status(500).json({ message: "Error retrieving medics" }); 
    });
});




app.get("/adminUsers/:userId", (req, res) => {
  const loggedInUserId = req.params.userId; 

  User.find({
    _id: { $ne: loggedInUserId }, 
  })
    .then((users) => {
      res.status(200).json(users); 
    })
    .catch((err) => {
      console.error("Error retrieving users", err); 
      res.status(500).json({ message: "Error retrieving users" }); 
    });
});




//textmessage localhost
app.listen(5001, () => {
  console.log("Node js server started.");
});

const http = require("http").createServer(app);

const io = require("socket.io")(http);

//{"userId" : "socket ID"}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  const userId = socket.handshake.query.userId;

  console.log("userid", userId);

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  console.log("user socket data", userSocketMap);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];

    console.log("receiver Id", receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
    }
  });
});

http.listen(3000, () => {
  console.log("Socket.IO running on port 3000");
});




//send message
app.post("/sendMessage", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      console.log("emitting recieveMessage event to the reciver", receiverId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log("receiver socket ID not found");
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("ERROR", error);
  }
});




//get all messages
app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error", error);
  }
});




app.get("/fetch-messages/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId} = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");


    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
