/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    const result = await UserServices.createStudentIntoDB(password, student);
    res.status(201).json({
      success: true,
      message: 'Student Create Succesfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
export const UserController = {
  createStudent,
};
