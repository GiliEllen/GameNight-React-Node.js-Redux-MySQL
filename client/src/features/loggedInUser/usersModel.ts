import Joi from "joi";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  user_id: string;
}

export const UserJoi = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  user_id: Joi.string(),
});
