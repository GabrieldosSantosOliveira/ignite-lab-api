import { User as UserType } from '@prisma/client';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prismaClient } from './../database/prismaClient';
config();
class Auth {
  static async login(request: Request, response: Response) {
    try {
      const { email, password }: UserType = request.body;
      if (!email || !password) {
        return response.status(400).json({
          message: 'Email and password are required',
        });
      }
      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      if (user === null) {
        return response.status(400).json({ message: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return response.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: 60 * 60 * 24, // 1 day
        },
      );
      return response.json({ token });
    } catch (error) {
      response.json({ error });
    }
  }
  static async middlewareAuth(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const Header = request.headers.authorization;
      if (!Header) {
        return response.status(401).json({ message: 'Token not provided' });
      }
      const parts = Header.split(' ');
      if (parts.length !== 2) {
        return response.status(401).json({ message: 'Token malformatted' });
      }
      const [Bearer, token] = parts;
      if (!token) {
        return response.status(401).json({ message: 'Token not provided' });
      }
      if (Bearer !== 'Bearer') {
        return response.status(401).json({ message: 'Token malformatted' });
      }
      jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
        if (err) {
          return response.status(401).json({ message: 'Token invalid' });
        }
        return next();
      });
    } catch (error) {
      response.json({ error });
    }
  }
}
export { Auth };
