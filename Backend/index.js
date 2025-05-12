const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./Route/UserRoutes");
const paymentRouter = require("./Route/PaymentRoutes");
const instructorRouter = require("./Route/InstructorRouter");
const feedbackRouter = require('./Route/feedbackRoutes');
const appointmentRouter = require('./Route/appoinmentRoutes');
const attendanceRoutes = require('./Route/attendanceRoutes');
const addcourseRouter = require('./Route/AddcourseRouter');
const registerRouter = require('./Route/RegisterRoutes');
const messageRouter = require('./Route/MessageRoutes');
const Register = require('./Model/Register');
const InstructorCredentials = require('./Model/InstructorCredentials');
const insRoutes = require('./Route/InsRoutes');
const addAppointmentsRouter = require('./Route/AddAppointmentsRouter');

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/users", registerRouter);
app.use("/payments", paymentRouter);
app.use("/instructors", insRoutes);
app.use("/feedback", feedbackRouter);
app.use("/appointments", appointmentRouter);
app.use("/Attendance", attendanceRoutes);
app.use("/Addcourse", addcourseRouter);
app.use("/messages", messageRouter);
app.use("/api/appointments", addAppointmentsRouter); // Add the new appointments routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});

// MongoDB connection
mongoose.connect("mongodb+srv://kanchana:kanchana@userdb.0k55m.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Login route
app.post("/login", async (req, res) => {
    const { gmail, password } = req.body;
    try {
        // Check in student/user collection
        const user = await Register.findOne({ gmail });
        if (user && user.password === password) {
            return res.send({
                status: "ok",
                user: {
                    name: user.name,
                    gmail: user.gmail,
                    studentId: user.studentId,
                    role: "student"
                }
            });
        }
        
        // Check in instructor credentials collection
        const instructor = await InstructorCredentials.findOne({ email: gmail });
        if (instructor && instructor.password === password) {
            return res.send({
                status: "ok",
                user: {
                    name: instructor.name,
                    gmail: instructor.email,
                    instructorId: instructor.instructorId,
                    instructorType: instructor.instructorType,
                    role: "instructor"
                }
            });
        }
        
        // No user found or password incorrect
        return res.json({ err: "Invalid email or password" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "server Err" });
    }
});

