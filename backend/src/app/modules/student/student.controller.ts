/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students retrieved Succesfully',
    meta:result.meta,
    data: result.result,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getSingleStudenFromDb(
    req.params.studentId,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved Succesfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.deleteStudentFromDb(
    req.params.studentId,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is deleted Succesfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.updateStudentFromDB(
    req.params.studentId,
    req.body.student,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is updated Succesfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
