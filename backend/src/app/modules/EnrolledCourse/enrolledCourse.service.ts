/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../utils/AppError';
import { OfferedCourse } from '../OfferedCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offerod course not found');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Section is Already Full');
  }
  const student = await Student.findOne({ id: userId });

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already Enrolled');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicSemester: isOfferedCourseExists.academicSemester,
          faculty: isOfferedCourseExists.faculty,
          student: student?._id,
          course: isOfferedCourseExists.course,
          offeredCourse: offeredCourse,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to enrolled course');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    console.log(maxCapacity);
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    (await session).commitTransaction();
    (await session).endSession();

    return result;
  } catch (err: any) {
    (await session).abortTransaction();
    (await session).endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
};
