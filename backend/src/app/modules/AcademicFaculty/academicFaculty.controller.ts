import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic Faculty is Created Successfully',
      data: result,
    });
  },
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getAllAcademicFacultyFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties are retrieved Successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(
      req.params.facultyId,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is retrieved Successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.updateAcademicFaculty(
      req.params.facultyId,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is updated Successfully',
      data: result,
    });
  },
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  getSingleAcademicFaculty,
};
