const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser'); 
const bcrypt = require('bcryptjs');
require('../app/model/user'); 
require('../app/model/task'); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoUrl = 'mongodb+srv://lamborghininguyn:G0V7J1wZXC5wDfXi@cluster0.7uvb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl).then(() => {
    console.log("Database is connected!");
}).catch((e) => {
    console.log(e);
});

// Define the User model
const User = mongoose.model("userInfo");
const Task = mongoose.model("taskManagement");

// Root route
app.get("/", (req, res) => {
    res.send({status: "Started"});
});

// Register route
app.post('/register', async (req, res) => {
    const { user_email, user_password } = req.body;
    const encryptedPassword = await bcrypt.hash(user_password, 5)
    
    // Check if the user already exists
    const oldUser = await User.findOne({ user_email: user_email });
    if (oldUser) {
        return res.status(400).send("User already exists!");
    }

    try {
        // Create a new user
        await User.create({
            user_email: user_email,
            user_password: encryptedPassword,
        });
        res.status(201).send({
            status: "ok",
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
});

app.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ user_email: user_email });

        if (!user) {
            return res.send({
                status: "error",
                message: "User not found!",
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);

        if (!isPasswordValid) {
            return res.send({
                status: "error",
                message: "Invalid password!",
            });
        }

        // If email and password are valid, send success response
        res.send({
            status: "ok",
            message: "Login successful!",
        });
    } catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});

app.post('/addTask', async(req, res) => {
    const { task_name, task_description, task_member } = req.body

    try { 
        await Task.create({
            task_name: task_name,
            task_description: task_description,
            task_member: task_member,
        });
        res.status(201).send({
            status: "ok",
            message: "Task created successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
});

// Start server
app.listen(5001, () => {
    console.log("NodeJS Server Started on port 5001!");
});
