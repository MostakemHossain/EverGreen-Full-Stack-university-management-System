import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorizad');
    }
    // check the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_serect as string,
    ) as JwtPayload;
    const { userId, role, iat } = decoded;

    // check the user is exists
    const isUserExists = await User.findOne({ id: userId });

    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
    }
    // check is the user is already deleted
    if (isUserExists?.isDeleted || isUserExists.status === 'blocked') {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
    }
    const passwordChangeAt= isUserExists?.passwordChangeAt as string | number | Date
    const passwordChangedAt =
      new Date(passwordChangeAt).getTime() / 1000;
    if (passwordChangedAt > Number(iat)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorizad');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorizad');
    }
    req.user = decoded as JwtPayload;

    next();
  });
};
export default auth;
