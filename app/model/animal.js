const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    animal_date: { type: String, maxLength: 100 },
    animal_name: { type: String, maxLength: 100 },
    animal_details: { type: String, maxLength: 100 },
    animal_quantity: { type: Number },
    animal_image: { type: String, maxLength: 500 }, // New field for storing image URL
}, {
    collection: "animalManagerment"
});

mongoose.model("animalManagerment", animalSchema);