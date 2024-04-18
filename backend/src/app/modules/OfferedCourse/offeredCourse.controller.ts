import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Offered Course created Successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    success: true,
    message: 'Offered Course are retrieved Successfully',
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.result,
  });
});
const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseService.getSingleOfferedCourseFromDB(
      req.params.id,
    );
    sendResponse(res, {
      success: true,
      message: 'Offered Course is retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.updateCourseFromDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Offered Course is retrieved Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const myOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await OfferedCourseService.myOfferedCourses(userId,req.query);
  sendResponse(res, {
    success: true,
    message: 'Offered Course is retrieved Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  myOfferedCourses
};
