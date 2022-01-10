const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    crateionDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Todo", todoSchema);
