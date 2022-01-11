const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema({ index: Number, _id: { type: Boolean, default: false } });

module.exports = mongoose.model("counter", CountSchema);
