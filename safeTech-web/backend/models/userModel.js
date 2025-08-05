import mongoose  from "mongoose";

const UserDetailSchema = new mongoose.Schema(
{
name: String,
email: { type: String, unique: true, required: true },
password: String,
userType: String,
contact: String,
HNO:{ type: String },
NOK:{ type: String },
econtact:{ type: String },
dob:{ type: String },
gender:{ type: String },
conditions:[],
allergies:[],
blood:{ type: String },
sickling:{ type: String },
userId: { type: String },
state: {
  type: String,
  enum: ['online', 'offline'], // Enum values
  default: 'offline', // Default value
},
location: {
    latitude: { type: Number},
    longitude: { type: Number},
},
image: {
    type: String,
  },

  
 

},
{
collection: "people", // Ensure this matches the collection name on the server
timestamps: true, // Optional: to include timestamps
}
);

const User = mongoose.model("people", UserDetailSchema);

export default User

