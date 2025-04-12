import express from "express"
import taskController from "../controller/tasks.controller.js";



const router = express.Router();

router.post('', taskController.createTask)

router.get('', taskController.retrieveTask)
export default router

