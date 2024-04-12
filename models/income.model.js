const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true,
        default: 0
    },
    description:{
        type: String
    },
    category:{
        type: String,
        required: true,

    },
    transactionDate:{
        type: Date,
        required: true
    }
})

const IncomeSchema = mongoose.model("IncomeSchema", incomeSchema);
module.exports = IncomeSchema
