import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create enrolled course successfully',
    data: result,
  });
});
const updateEnrolledOfferedCourseMarks = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDB(
      userId,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Update marks course successfully',
      data: result,
    });
  },
);

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledOfferedCourseMarks,
};
