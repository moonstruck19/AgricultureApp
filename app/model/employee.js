const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({
    emp_name: {type: String, maxLength: 100},
    emp_age: {type: String, maxLength: 100},
    emp_phone: {type: Number, maxLength: 10},
    emp_address: {type: String, maxLength: 100},
    emp_salary: {type: Number, minLength: 4, maxLength: 6},
}, {
    collection: "empManagerment"
});
mongoose.model("empManagerment", empSchema)