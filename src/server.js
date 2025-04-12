import express from 'express'
import { establishDataBaseConnection } from './config/db.js' 

import taskRoutes from "./routes/tasks.routes.js";

const app = express()
const port = 3000

app.use(express.json());

app.listen(port, ()=>{
  establishDataBaseConnection();
  console.log("APP IS LISTENING ON PORT", port)
})


// app.post('/api/tasks', async (req, res) => {
//   const { error, value } = taskSchema.validate(req.body);
//
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//
//   try {
//     const task = await Task.create(value);
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error', msg: err.message });
//   }
// });

app.use('/api/tasks/',taskRoutes);





