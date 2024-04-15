/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../utils/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { AcademicDepartment } from '../AcademinDepartment/academicDepartment.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create new user object
  const user: Partial<TUser> = {};

  // if password is not given use default password
  user.password = password || (config.default_password as string);
  // set role
  user.role = 'student';
  user.email = payload.email;

  // find academic semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generated id
    user.id = await generateStudentId(admissionSemester);
    const imgName = `${user.id}${payload?.name?.firstName}`;
    //send Image to cloudinary
    const {secure_url} = await sendImageToCloudinary(imgName, file?.path);
    // create a user
    const newUser = await User.create([user], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = secure_url

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
  }
};

const createFacultyIntoDB = async (file:any,password: string, payload: TFaculty) => {
  const user: Partial<TUser> = {};

  user.password = password || config.default_password;
  user.role = 'faculty';
  user.email = payload.email;

  // academic department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not Found',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = await generateFacultyId();
    const imgName = `${user.id}${payload?.name?.firstName}`;
    //send Image to cloudinary
    const {secure_url} = await sendImageToCloudinary(imgName, file?.path);
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg= secure_url

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (file:any,password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    const imgName = `${userData.id}${payload?.name?.firstName}`;
    //send Image to cloudinary
    const {secure_url} = await sendImageToCloudinary(imgName, file?.path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg= secure_url

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId });
  } else if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate({
      path: 'user',
      select: '-password',
    });
  } else if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }

  return result;
};

const changeStatus = async (
  id: string,
  payload: {
    status: string;
  },
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  }).select('-password');
  return result;
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
