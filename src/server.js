import { establishDataBaseConnection } from './config/db.js' 
import { Task } from './models/task.model.js'
import { taskSchema } from './models/task.validation.js'
import express from 'express'
const app = express()
const port = 3000

app.listen(port, ()=>{
  console.log("APP IS LISTENING ON PORT", port)
})

app.use(express.json());
establishDataBaseConnection();

app.post('/api/tasks', async (req, res) => {
  const { error, value } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const task = await Task.create(value);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Database error', msg: err.message });
  }
});





