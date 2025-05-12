const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/attendanceController');

// Get all attendance records
router.get('/', attendanceController.getAllAttendance);

// Get attendance records by student ID
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);

// Get attendance records by instructor ID
router.get('/instructor/:instructorId', attendanceController.getAttendanceByInstructor);

// Create a new attendance record
router.post('/', attendanceController.createAttendance);

// Update an attendance record
router.put('/:id', attendanceController.updateAttendance);

// Delete an attendance record
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
