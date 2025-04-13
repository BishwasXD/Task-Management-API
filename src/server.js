import express from 'express'
import { establishDataBaseConnection } from './config/db.js'

import taskRoutes from "./routes/tasks.routes.js";

const app = express()
const port = 3000

app.use(express.json());

establishDataBaseConnection().then(() => {
  app.listen(port, () => {
    console.log("APP IS LISTENING ON PORT", port)
  })
}).catch((error) => {
  console.error("Failed to connect to Database. Server not started", error)
})



app.use('/api/tasks/', taskRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found, avaibale route: /api/tasks" });
});




