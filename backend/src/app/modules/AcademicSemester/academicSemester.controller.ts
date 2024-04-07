import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemester(
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Create Academic Semester',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
};
