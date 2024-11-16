const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema ({
    ex_date: {type: String, maxLength: 100},
    ex_type: {type: String, maxLength: 100},
    ex_quantity: {type: String, maxLength: 100},
    ex_price: {type: String, maxLength: 100},
}, {
    collection: "expenseMana"
})
mongoose.model("expenseMana", expenseSchema)