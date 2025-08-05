const mongoose = require("mongoose");

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
    medications:[],
    conditions:[],
    allergies:[],
    addInfo:[] 
  },
  {
    collection: "medprof", // Ensure this matches the collection name on the server
    timestamps: true, // Optional: to include timestamps
  }
);

const Med = mongoose.model("medprof", MedicalProfileSchema);

module.exports = Med;