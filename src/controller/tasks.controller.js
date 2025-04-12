import { Task } from "../models/task.model.js";
import { taskSchema } from "../models/task.validation.js";


const taskController = {
  createTask: async(req, res) => {
    console.log(req.body)
    const { error, value } = taskSchema.validate(req.body)
    console.log("AFTER VALIDATION", value)
    if (error){
      return res.status(400).json({'message': error.details})
    }
    try {
      Task.create(value);
      res.status(201).json({"message": "Task created successfully", 'task': value})
    }
    catch (error){
      res.status(500).json({"message": "Error occurred", "details": error})
    }

  },

  retrieveTask: async(req, res) => {
    try{
    const tasks = await Task.find();
    res.status(200).json({"message": "data retrieved successfully", "data": tasks})
    }
   
  catch (error){
      res.status(500).json({"message": "Error occurred", "details": error})
    }

  }

}


export default taskController
