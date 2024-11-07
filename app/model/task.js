const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task_name: {type: String, maxLength: 100},
    task_description: {type: String, maxLength: 100},
    task_date_start: {type: String, maxLength: 100},
    task_date_end: {type: String, maxLength: 100},
    task_member: {type: String, maxLength: 100},
    task_status:{type: String, maxLength: 100}
}, {
    collection: "taskManagerment"
});
mongoose.model("taskManagerment", taskSchema)