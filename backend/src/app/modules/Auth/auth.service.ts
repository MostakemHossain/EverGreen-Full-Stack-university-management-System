import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../utils/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

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
  //   const accessToken = jwt.sign(jwtPayload, config.jwt_access_serect as string, {
  //     expiresIn: config.jwt_access_serect_expires_in,
  //   });
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    config.jwt_access_serect_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_serect as string,
    config.jwt_refresh_serect_expires_in as string,
  );

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  // check the user is exists
  const isUserExists = await User.findOne({ id: user.userId });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }
  // check is the user is already deleted
  if (isUserExists?.isDeleted || isUserExists.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }

  // check if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.oldPassword,
    isUserExists?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'invalid credentials');
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  ).select('-password');
  return result;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorizad');
  }
  // check the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_serect as string);
  const { userId, iat } = decoded;

  // check the user is exists
  const isUserExists = await User.findOne({ id: userId });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }
  // check is the user is already deleted
  if (isUserExists?.isDeleted || isUserExists.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not Found');
  }
  const passwordChangeAt = isUserExists?.passwordChangeAt as
    | string
    | number
    | Date;
  const passwordChangedAt = new Date(passwordChangeAt).getTime() / 1000;
  if (passwordChangedAt > Number(iat)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorizad');
  }

  // create token and sent to the users
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    config.jwt_access_serect_expires_in as string,
  );
  return {
    accessToken,
  };
};
const forgetPassword = async (id: string) => {
  const user = await User.findOne({
    id,
    isDeleted: false,
    status: 'in-progress',
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is Not Found');
  }
  // create token and sent to the users
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_serect as string,
    '10m',
  );
  const resetLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetLink);
};

const resetPassword = async (
  payload: {
    id: string;
    newPassword: string;
  },
  token: string,
) => {
  const { id } = payload;
  const user = await User.findOne({
    id,
    isDeleted: false,
    status: 'in-progress',
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is Not Found');
  }
  // check the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_serect as string,
  ) as JwtPayload;

  if (decoded.userId !== id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      id: payload.id,
    },
    {
      password: hashedPassword,
    },
  ).select('-password');
  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
