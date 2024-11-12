const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser') 
const bcrypt = require('bcryptjs')
require('../app/model/user') 
require('../app/model/task') 
require('../app/model/employee') 
require('../app/model/crop')
require('../app/model/animal')
require('../app/model/revenue')

// Middleware
app.use(cors())
app.use(bodyParser.json())

// MongoDB connection
const mongoUrl = 'mongodb+srv://lamborghininguyn:G0V7J1wZXC5wDfXi@cluster0.7uvb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoUrl).then(() => {
    console.log("Database is connected!")
}).catch((e) => {
    console.log(e)
})

// Define the User model
const User = mongoose.model("userInfo")
const Task = mongoose.model("taskManagerment")
const Emp = mongoose.model("empManagerment")
const Crop = mongoose.model("cropManagerment")
const Animal = mongoose.model("animalManagerment")
const Revenue = mongoose.model("revenueMana")

// Root route
app.get("/", (req, res) => {
    res.send({status: "Started"})
})

//================================LOGIN/REGISTER===================================//
app.post('/register', async (req, res) => {
    const { user_email, user_password } = req.body
    const encryptedPassword = await bcrypt.hash(user_password, 5)
    
    // Check if the user already exists
    const oldUser = await User.findOne({ user_email: user_email })
    if (oldUser) {
        return res.status(400).send("User already exists!")
    }

    try {
        // Create a new user
        await User.create({
            user_email: user_email,
            user_password: encryptedPassword,
        })
        res.status(201).send({
            status: "ok",
            message: "User created successfully",
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

app.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body

    try {
        const user = await User.findOne({ user_email: user_email })

        if (!user) {
            return res.send({
                status: "error",
                message: "User not found!",
            })
        }

        const isPasswordValid = await bcrypt.compare(user_password, user.user_password)

        if (!isPasswordValid) {
            return res.send({
                status: "error",
                message: "Invalid password!",
            })
        }

        res.send({
            status: "ok",
            message: "Login successful!",
        })
    } catch (error) {
        res.send({
            status: "error",
            message: error.message,
        })
    }
})

//================================TASK MANAGERMENT===================================//

app.post('/addTask', async(req, res) => {
    const { task_name, task_description, task_date_start, task_date_end, task_member, task_status } = req.body

    try { 
        await Task.create({
            task_name: task_name,
            task_description: task_description,
            task_date_start: task_date_start,
            task_date_end: task_date_end,
            task_member: task_member,
            task_status: task_status,
        })
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
})

app.get('/fetchTask', async(req, res) => {
    try {
        const data = await Task.find({})
        res.send({
            status: "ok",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/updateTask", async (req, res) => {
    const { taskId, task_status } = req.body

    try {
        const result = await Task.updateOne(
            { _id: new mongoose.Types.ObjectId(taskId) },
            { $set: { task_status: task_status } }
        )

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "Task status updated successfully" })
        } else {
            res.status(404).json({ message: "Task not found" })
        }
    } catch (error) {
        console.error("Error updating task status: ", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

app.delete('/deleteTask', async (req, res) => {
    const { taskId } = req.body

    try {
        const task = await Task.findByIdAndDelete(taskId)

        if (task) {
            res.status(200).json({ message: "Task deleted successfully" })
        } else {
            res.status(404).json({ message: "Task not found" })
        }
    } catch (error) {
        console.error("Error deleting task: ", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

app.put('/editTask', async (req, res) => {
    const { taskId, updatedData } = req.body
  
    if (!taskId || !updatedData) {
      return res.status(400).json({ message: "Invalid request. Missing taskId or updatedData" })
    }
  
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: updatedData },
        { new: true }
      )
  
      if (task) {
        res.status(200).json({ message: "Task updated successfully", task })
      } else {
        res.status(404).json({ message: "Task not found" })
      }
    } catch (error) {
      console.error("Error updating task:", error)
      res.status(500).json({ message: "Internal server error", error: error.message })
    }
  })

//================================CROP MANAGERMENT===================================//

app.post('/addCrop', async(req, res) => {
    const { crop_name, crop_date, crop_details } = req.body

    try { 
        await Crop.create({
            crop_name: crop_name,
            crop_date: crop_date,
            crop_details: crop_details,
        })
        res.status(201).send({
            status: "ok",
            message: "Crop created successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

app.get('/fetchCrop', async(req, res) => {
    try {
        const data = await Crop.find({})
        res.send({
            status: "ok",
            data: data
        })

    } catch (error) {
        console.log(error)
    }
})


//================================ANIMAL MANAGERMENT===================================//

app.post('/addAnimal', async(req, res) => {
    const {animal_name, animal_date, animal_details, animal_quantity } = req.body

    try {
        await Animal.create({
            animal_name: animal_name,
            animal_date: animal_date, 
            animal_details: animal_details,
            animal_quantity: animal_quantity
        })
        res.status(201).send({
            status: "ok",
            message: "Animal add successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
})

app.get('/fetchAnimal', async(req, res) => {
    try {
        const data = await Animal.find({})
        res.send({
            status: "ok",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
})

//================================EMPLOYEE MANAGERMENT===================================//

app.post('/addEmp', async(req, res) => {
    const { emp_name, emp_age, emp_phone, emp_address, emp_salary } = req.body

    try {
        await Emp.create({
            emp_name: emp_name,
            emp_age: emp_age,
            emp_phone: emp_phone,
            emp_address: emp_address,
            emp_salary: emp_salary,
        })
        res.status(201).send({
            status: "ok",
            message: "Emp add successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
})

app.get('/fetchEmp', async(req, res) => {
    try {
        const data = await Emp.find({})
        res.send({
            status: "ok",
            data: data
        })

    } catch (error) {
        console.log(error)
    }
})

app.delete('/deleteEmp', async (req, res) => {
    const { empId } = req.body
  
    try {
      const emp = await Emp.findByIdAndDelete(empId) // Ensure Employee model is used here
  
      if (emp) {
        res.status(200).json({ message: "Employee deleted successfully" })
      } else {
        res.status(404).json({ message: "Employee not found" })
      }
    } catch (error) {
      console.error("Error deleting employee:", error)
      res.status(500).json({ message: "Internal server error" })
    }
})  

app.put('/editEmp', async (req, res) => {
  const { empId, updatedData } = req.body;

  if (!empId || !updatedData) {
    return res.status(400).json({ message: "Invalid request. Missing empId or updatedData" });
  }

  try {
    const emp = await Emp.findByIdAndUpdate(
      empId,
      { $set: updatedData },
      { new: true }
    );

    if (emp) {
      res.status(200).json({ message: "Employee updated successfully", emp });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

//================================FINANCE MANAGERMENT===================================//
app.post('/addRevenue', async (req, res) => {
    const { re_date, re_type, re_price } = req.body

    try { 
        await Revenue.create({
            re_date: re_date,
            re_type: re_type,
            re_price: re_price
        })
        res.status(201).send({
            status: "ok",
            message: "Revenue record write successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})


// Start server
app.listen(5001, () => {
    console.log("NodeJS Server Started on port 5001!")
})
