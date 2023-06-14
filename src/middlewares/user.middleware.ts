import { NextFunction, Request, Response } from "express";
import {UserValidator} from "../validators";
import {ApiError} from "../errors";
import {userService} from "../services/user.service";

class UserMiddleware {
    public isCreateValid(req: Request,res: Response, next: NextFunction) {
        try {
            const { error, value } = UserValidator.create.validate(req.body);
            if (error) {
                throw new ApiError(error.message, 400);
            }

            req.user

        } catch (e) {
            next(e);
        }
    }
}
export userMiddleware = new UserMiddleware();