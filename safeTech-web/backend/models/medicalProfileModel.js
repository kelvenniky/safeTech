import mongoose from "mongoose"

const MedicalProfileSchema = new mongoose.Schema(
  {
    email: { type: String, },
    name: { type: String }, 
    contact:{ type: String }, 
    address:{ type: String }, 
    NOK:{ type: String }, 
    econtact:{ type: String }, 
    dob:{ type: String }, 
    gender:{ type: String }, 
    medications:{ type: String }, 
    conditions:{ type: String }, 
    allergies:{ type: String }, 
    addInfo:{ type: String }, 
  },
  {
    collection: "medprof", // Ensure this matches the collection name on the server
    timestamps: true, // Optional: to include timestamps
  }
);

const medicalProfileModel = mongoose.model("medprof", MedicalProfileSchema);

export default medicalProfileModel;