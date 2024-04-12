import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.services';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
    console.log(req.cookies)
  const result = await FacultyService.getAllFacultyFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Get all faculties successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getSingleFacultyFromDB(
    req.params.facultyId,
  );
  sendResponse(res, {
    success: true,
    message: 'Get faculty successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.updateFacultyIntoDB(
    req.params.facultyId,
    req.body.faculty,
  );
  sendResponse(res, {
    success: true,
    message: 'Faculty is updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.deleteFaculty(req.params.facultyId);
  sendResponse(res, {
    success: true,
    message: 'Faculty is deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
