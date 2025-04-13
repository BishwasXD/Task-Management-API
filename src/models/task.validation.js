import Joi from "joi"

export const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  status: Joi.string().valid('assigned', 'pending', 'completed').required(),  
  description: Joi.string().min(30).max(150).optional(),
  assignee: Joi.string().min(3).max(30).required(),

})

export const taskUpdateSchema = taskSchema.fork(
  ['title', 'priority', 'status', 'description', 'assignee'],
  field => field.optional()
);

