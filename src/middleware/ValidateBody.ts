import { User as UserType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import {
  UserSchema,
  UserSchemaUpdate
} from './../models/User';
export class ValidateBody {
  static async CreateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const value: UserType = request.body;
    const { error } = UserSchema.validate(value);
    if (error) {
      return response
        .status(400)
        .json({ message: error.message });
    }
    return next();
  }
  static async UpdateUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const value: UserType = request.body;
    const { error } = UserSchemaUpdate.validate(value);
    if (error) {
      return response
        .status(400)
        .json({ message: error.message });
    }
    return next();
  }
}
