import express from 'express'
import userSignUpController from '../controller/userSignUp.js';
import userSignInController from '../controller/userSignIn.js';
import userDetailsController from '../controller/userDetails.js';
import authToken from '../middleware/authToken.js';
import userLogout from '../controller/userLogout.js';
import AllUsers from '../controller/AllUsers.js';
import getUserDetails from '../controller/getUserDetails.js';
import AllEmergencies from '../controller/allEmergengies.js';
import getMessageUsers from '../controller/getMessageUsers.js';
import { sendMessage } from '../controller/messageController.js';
import YourMessages from '../controller/YourMessage.js';
import userEmergency from '../controller/UserEmergency.js';
import AllMedics from '../controller/AllMedics.js';

const router = express.Router();



// Correct the route definition
router.post("/signUp", userSignUpController); // Pass the controller function
router.post("/signIn", userSignInController); // Pass the controller function
router.get("/user-details",authToken, userDetailsController); // Pass the controller function
router.get("/userLogout", userLogout); // Pass the controller function

//get all users from mobile app
router.get("/all-users", AllUsers); // Pass the controller function
router.post('/get-user-details',getUserDetails)

//get all emergencies
router.get("/all-emergencies", AllEmergencies); // Pass the controller function
router.get("/message-users",authToken, getMessageUsers); // Pass the controller function
router.post("/sendMessage/:id",authToken, sendMessage); // Pass the controller function
router.get("/messages",YourMessages); // Pass the controller function
router.get("/user-emerg/:userId",userEmergency); // Pass the controller function

//GET ALL MEDICS
router.get("/all-medics",AllMedics); // Pass the controller function






//get medoprofile









export default router;