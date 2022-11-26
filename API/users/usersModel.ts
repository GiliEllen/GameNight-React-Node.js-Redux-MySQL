import Joi from "joi";

export const UserJoi = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rePassword: Joi.ref('password')
});