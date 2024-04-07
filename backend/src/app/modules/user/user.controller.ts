/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;

    const result = await UserServices.createStudentIntoDB(password, student);
    res.status(201).json({
      success: true,
      message: 'Student Create Succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};
export const UserController = {
  createStudent,
};
