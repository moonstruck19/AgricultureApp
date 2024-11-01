const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema ({
    animal_name: {type: String, maxLength: 100},
    animal_details: {type: String, maxLength: 100},
    animal_quantity: {type: String, maxLength: 100},
    animal_date: {type: String, maxLength: 100},
}, {
    collection: "animalManagerment"
})
mongoose.model("animalManagerment", animalSchema)