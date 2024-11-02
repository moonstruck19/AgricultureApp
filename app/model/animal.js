const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema ({
    animal_date: {type: String, maxLength: 100},
    animal_name: {type: String, maxLength: 100},
    animal_details: {type: String, maxLength: 100},
    animal_quantity: {type: Number},
}, {
    collection: "animalManagerment"
})
mongoose.model("animalManagerment", animalSchema)