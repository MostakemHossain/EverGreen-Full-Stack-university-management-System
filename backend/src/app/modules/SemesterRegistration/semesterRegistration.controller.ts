import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Semester registration is Created Successfully',
      data: result,
    });
  },
);
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.query,
      );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'get All semester retrueved Successfully',
      data: result,
    });
  },
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(
        req.params.id,
      );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'get Single Semester registation Successfully',
      data: result,
    });
  },
);
const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.updateSemesterRegistration(
      req.params.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: ' Requested Semester registation is updated Successfully',
      data: result,
    });
  },
);
const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is deleted successfully',
      data: result,
    });
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
