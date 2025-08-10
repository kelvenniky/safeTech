const mongoose = require("mongoose");

const MapPointerSchema = new mongoose.Schema(
{
latitude:Number,
longitude:Number,
type: {
  type: String,
  enum: ['safe','danger', 'security',], // Enum values
},


},
{
collection: "pointer", // Ensure this matches the collection name on the server
timestamps: true, // Optional: to include timestamps
}
);

const Pointer = mongoose.model("pointer", MapPointerSchema);

module.exports = Pointer;


