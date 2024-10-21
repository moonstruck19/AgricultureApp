const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_email: {type: String, unique: true},
    user_password: {type: String, maxLength: 100},
}, {
    collection: "userInfo"
});
mongoose.model("userInfo", userSchema)