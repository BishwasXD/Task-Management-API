import express from "express"
import taskController from "../controller/tasks.controller.js";



const router = express.Router();


router.route('/')
  .post(taskController.createTask)
  .get(taskController.retrieveTask);

router.route('/:id')
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router

