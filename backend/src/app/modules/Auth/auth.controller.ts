import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  sendResponse(res, {
    success: true,
    message: 'Password change Successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
export const AuthController = {
  loginUser,
  changePassword,
};
