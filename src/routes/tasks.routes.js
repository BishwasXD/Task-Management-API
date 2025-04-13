import express from "express"
import taskController from "../controller/tasks.controller.js";



const router = express.Router();

router.post('', taskController.createTask)
router.get('', taskController.retrieveTask)
router.get('/:id', taskController.getTaskById)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

export default router

