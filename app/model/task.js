const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task_name: {type: String, maxLength: 100},
    task_description: {type: String, maxLength: 100},
    task_member: {type: String, maxLength: 100},
}, {
    collection: "taskManagement"
});
mongoose.model("taskManagement", taskSchema)