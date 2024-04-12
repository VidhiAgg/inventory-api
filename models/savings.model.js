const mongoose = require("mongoose");
const savingSchema = mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    source:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
})


const Savings = mongoose.model("Savings", savingSchema);
module.exports = Savings;