import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Offered Course created Successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
