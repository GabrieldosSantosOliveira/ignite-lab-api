import Joi from "joi";
export const UserSchema = Joi.object({
  firstName: Joi.string().min(5).max(255).required(),
  lastName: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const UserSchemaUpdate = Joi.object({
  firstName: Joi.string().min(5).max(255),
  lastName: Joi.string().min(5).max(255),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});
