import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static create = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),
    age: Joi.number().min(1).max(150).required(),
    gender: Joi.valid(...Object.values(EGenders)).required(),
    email: Joi.string()
      .regex(regexConstants.EMAIL)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string().regex(regexConstants.PASSWORD).trim().required(),
  });

  static update = Joi.object({
    name: Joi.string().min(3).max(30).trim(),
    age: Joi.number().min(1).max(150),
    gender: Joi.valid(EGenders),
  });
}
