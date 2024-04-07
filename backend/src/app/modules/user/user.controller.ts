/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body;

  const result = await UserServices.createStudentIntoDB(password, student);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Student Create Succesfully',
    data: result,
  });
});
export const UserController = {
  createStudent,
};
