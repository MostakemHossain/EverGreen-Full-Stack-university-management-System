import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Successfully created academic department.',
      success: true,
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic deparements are retrieved Successfully.',
      success: true,
      data: result,
    });
  },
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
        req.params.departmentId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic deparement is retrieved Successfully.',
      success: true,
      data: result,
    });
  },
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      req.params.departmentId,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic deparement is updated Successfully.',
      success: true,
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
