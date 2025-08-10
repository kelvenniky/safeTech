const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    userName: { type: String },
    userId: { type: String },
    address: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    hospitalAddress: { type: String },
    hospitalLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'dispatched', 'arrived', ], // Enum values
        default: 'pending', // Default value
    },
    closestMedicId:{ type: String },
    closestMedicName:{ type: String },
}, {
    collection: "emergency",
    timestamps: true
});

const emergencyModel = mongoose.model('Emergency', EmergencySchema);
module.exports = emergencyModel;