/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student } = req.body;

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    student,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Student Created Succesfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    faculty,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Faculty Created Succesfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'My profile retrived  succesfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const result = await UserServices.changeStatus(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User status changed succesfully',
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
