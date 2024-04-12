const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    paidTo:{
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


const Expenses = mongoose.model("Expenses", expenseSchema);
module.exports = Expenses;