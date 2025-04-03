import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor", required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Appointment", appointmentSchema);