const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoute = require("./Route/UserRoutes");
const insRoutes = require('./Route/InsRoutes');
const studentRoute = require("./Route/StudentRoutes");
const courseRoute = require("./Route/CourseRoutes");
const instructorRoute = require("./Route/InstructorRoutes");
const feedbackRoute = require("./Route/feedbackRoutes");
const courseTypeRoute = require("./Route/courseType");
const paymentRoute = require("./Route/PaymentRoutes");
const messageRoute = require("./Route/MessageRoutes");
const appointmentRoutes = require('./Route/AddAppointmentsRouter');
const progressRoutes = require('./Route/ProgressRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use(userRoute);
app.use(studentRoute);
app.use(courseRoute);
app.use(instructorRoute);
app.use(feedbackRoute);
app.use(courseTypeRoute);
app.use(paymentRoute);
app.use(messageRoute);
app.use(insRoutes);
app.use('/api/appointments', appointmentRoutes); // Changed route path to avoid conflicts
app.use(progressRoutes); // Added progress routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 