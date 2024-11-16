const mongoose = require("mongoose")

const revenueSchema = new mongoose.Schema ({
    re_date: {type: String, maxLength: 100},
    re_type: {type: String, maxLength: 100},
    re_quantity: {type: String, maxLength: 100},
    re_price: {type: String, maxLength: 100},
}, {
    collection: "revenueMana"
})
mongoose.model("revenueMana", revenueSchema)