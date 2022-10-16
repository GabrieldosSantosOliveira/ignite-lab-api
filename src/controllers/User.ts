import { User as UserType } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { prismaClient } from './../database/prismaClient';
class User {
  static async create(
    request: Request,
    response: Response
  ) {
    try {
      const {
        email,
        firstName,
        lastName,
        password
      }: UserType = request.body;
      const encryptedPassword = await bcrypt.hash(
        password,
        10
      );
      const user = await prismaClient.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: encryptedPassword
        }
      });
      return response.json(user);
    } catch (error) {
      response.json({ error });
    }
  }
  static async findOne(
    request: Request,
    response: Response
  ) {
    try {
      const { id } = request.params;
      const user = await prismaClient.user.findUnique({
        where: { id }
      });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }
  static async findAll(
    request: Request,
    response: Response
  ) {
    try {
      const users = await prismaClient.user.findMany();
      return response.json(users);
    } catch (error) {
      return response.json({ error });
    }
  }
  static async update(
    request: Request,
    response: Response
  ) {
    try {
      const { id } = request.params;
      const {
        email,
        firstName,
        lastName,
        password
      }: UserType = request.body;
      const user = await prismaClient.user.update({
        where: { id },
        data: { email, firstName, lastName, password }
      });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }
  static async delete(
    request: Request,
    response: Response
  ) {
    try {
      const { id } = request.params;
      const user = await prismaClient.user.delete({
        where: { id }
      });
      return response.json(user);
    } catch (error) {
      return response.json({ error });
    }
  }
}
export { User };
