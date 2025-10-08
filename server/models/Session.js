import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  content: { type: String, default: "" },
});

export default mongoose.model("Session", sessionSchema);
