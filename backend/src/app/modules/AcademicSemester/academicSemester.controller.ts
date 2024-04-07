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
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getAllAcademicSemester();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semesters fetched successfully',
      data: result,
    });
  },
);
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getSingleAcademicSemester(
      req.params.semesterId,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester fetched successfully',
      data: result,
    });
  },
);
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.updateAcademicSemester(
      req.params.semesterId,
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester is Updated successfully',
      data: result,
    });
  },
);
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.deleteAcademicSemester(
      req.params.semesterId,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester is deleted successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
