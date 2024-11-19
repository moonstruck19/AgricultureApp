const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_email: {type: String, unique: true},
    user_password: {type: String, maxLength: 100},
    code: {type:String},
    verified: {type:Boolean},
    resettoken: {type:String, required:false},
    resettokenExpiration: {type:Date, required:false}
}, {
    collection: "userInfo"
});
mongoose.model("userInfo", userSchema)