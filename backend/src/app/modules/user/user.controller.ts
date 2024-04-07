/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    const result = await UserServices.createStudentIntoDB(password, student);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
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
