import express from "express"


const router = express.Router();

router.post('', async (req, res)=>{
  res.status(200).json({"message" : "HANDLE TASK CREATION"})
  

})
router.get('', async (req, res)=>{
  res.status(200).json({"message" : "HANDLE TASK RETRIEVAL"})
  
})
export default router

