import mongoose from "mongoose";

export const Task = mongoose.model('Task', new mongoose.Schema({
  title: String,
  priority: String,
  status: String,
  description: String,
  assignee: String
},
  {
    timestamps: true
  }
));

