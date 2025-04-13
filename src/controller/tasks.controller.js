import { Types } from 'mongoose'
import { Task } from "../models/task.model.js";
import { taskSchema, taskUpdateSchema } from "../models/task.validation.js";



const taskController = {
  createTask: async (req, res) => {
    console.log(req.body)
    const { error, value } = taskSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ 'message': error.details })
    }
    try {
      Task.create(value);
      res.status(201).json({ "message": "Task created successfully", 'task': value })
    }
    catch (error) {
      res.status(500).json({ "message": "Error occurred", "details": error })
    }

  },

  retrieveTask: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
        priority,
        status,
        assignee
      } = req.query;

      const filter = {};
      if (priority) filter.priority = priority;
      if (status) filter.status = status;
      if (assignee) filter.assignee = assignee;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      const sortOrder = order === 'asc' ? 1 : -1;

      const tasks = await Task.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(parseInt(limitNum));

      res.status(200).json({ "message": "data retrieved successfully", "data": tasks })
    }

    catch (error) {
      res.status(500).json({ "message": "Error occurred", "details": error })
    }

  },

  getTaskById: async (req, res) => {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ "message": 'Invalid task ID format' })
    } try {
      const task = await Task.findById(id)
      if (!task) {
        return res.status(400).json({ "message": "Task not found" })
      }
      res.status(200).json({ "message": "Task found", "task": task })

    }
    catch (error) {
      res.status(500).json({ "message": "Error occured", "details": error })
    }

  },

  updateTask: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ "message": 'Invalid task ID format' });
    }

    const { error, value } = taskUpdateSchema.validate(updates);
    if (error) {
      return res.status(400).json({ "message": 'Validation error', "error": error });
    }

    try {
      const task = await Task.findByIdAndUpdate(id, value, {
        new: true,
      });

      if (!task) {
        return res.status(404).json({ "message": 'Task not found' });
      }

      res.status(200).json({ "message": 'Task updated successfully', "task": task });
    } catch (error) {
      res.status(500).json({ "message": 'Internal server error', "details": error });
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ "message": 'Invalid task ID format' });
    }

    try {

      const task = await Task.findByIdAndDelete(id)
      console.log("what is returned", task)
      if (task) {
        res.status(200).json({ "message": "Task deleted successfully" });
      }
      res.status(400).json({ "message": "Task not found" })
    } catch (error) {
      res.status(500).json({ "message": 'Internal server error', "details": error });
    }

  }
};


export default taskController
