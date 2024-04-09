import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.services';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getAllFacultyFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Get all faculties successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
};
