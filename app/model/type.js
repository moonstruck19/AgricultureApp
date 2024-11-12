const mongoose = require("mongoose")

const typeSchema = new mongoose.Schema({
    type_name: {type: String, maxLength: 100},
}, {
    collection: "typeManagerment"
})
mongoose.model("typeManagerment", typeSchema)