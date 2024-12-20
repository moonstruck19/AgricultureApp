const mongoose = require("mongoose")

const cropSchema = new mongoose.Schema ({
    crop_name: {type: String, maxLength: 100},
    crop_date: {type: String, maxLength: 100},
    crop_details: {type: String, maxLength: 100},
    crop_image: {type: String, maxLength: 500},
}, {
    collection: "cropManagerment"
})
mongoose.model("cropManagerment", cropSchema)