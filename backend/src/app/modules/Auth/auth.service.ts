import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../utils/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // check the user is exists
  const isUserExists = await User.findOne({ id: payload.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }
  // check is the user is already deleted
  if (isUserExists?.isDeleted || isUserExists.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }

  // check if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'invalid credentials');
  }

  // create token and sent to the users
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_serect as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
