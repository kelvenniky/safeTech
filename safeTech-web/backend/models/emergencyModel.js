import mongoose from "mongoose"

const EmergencySchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },  // New field for user name
    address: { type: String, required: true },    // New field for address
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
}, {
    collection: "emergency",
    timestamps: true
});

const emergencyModel = mongoose.model('Emergency', EmergencySchema);
export default emergencyModel;