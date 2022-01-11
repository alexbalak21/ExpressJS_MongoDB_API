const mongoose = require("mongoose");
const Counter = require("../models/Counter");

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
    index: Number,
});

//IMPLEMENTING COUNTER FOR INDEX
todoSchema.pre("save", async function () {
    let item = this;
    const count = await Counter.findOne();
    if (!count) {
        //COUNT IS EMPTY, CREATING COUNT
        let newIndex = new Counter({ index: 1 });
        item.index = 1;
        await newIndex.save();
        //SAVE NEW COUNTER
    } else if (count.index >= 1) {
        //IF COUNTER EXISTS
        count.index++;
        item.index = count.index;
        await count.save();
    }
});

module.exports = mongoose.model("todo", todoSchema);
