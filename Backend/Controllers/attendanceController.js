const Attendance = require('../Model/attendanceModel');
const Appointment = require('../Model/appointmentModel');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate('studentId', 'name email')
            .sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get attendance records by student ID
exports.getAttendanceByStudent = async (req, res) => {
    try {
        const attendance = await Attendance.find({ studentId: req.params.studentId })
            .sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get attendance records by instructor ID
exports.getAttendanceByInstructor = async (req, res) => {
    try {
        // First, find appointments for this instructor
        const appointments = await Appointment.find({ instructorId: req.params.instructorId });
        
        // Get student IDs from these appointments
        const studentIds = appointments.map(appointment => appointment.studentId);
        
        // Find attendance records for these students
        const attendance = await Attendance.find({ studentId: { $in: studentIds } })
            .populate('studentId', 'name email')
            .sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const { studentId, date, status, notes } = req.body;
        
        // Check if attendance record already exists for this student on this date
        const existingRecord = await Attendance.findOne({ 
            studentId, 
            date: new Date(date).setHours(0, 0, 0, 0)
        });
        
        if (existingRecord) {
            return res.status(400).json({
                success: false,
                message: 'Attendance record already exists for this student on this date'
            });
        }
        
        const attendance = await Attendance.create({
            studentId,
            date,
            status,
            notes
        });
        
        res.status(201).json({
            success: true,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }
        
        res.status(200).json({
            success: true,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Attendance record deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
