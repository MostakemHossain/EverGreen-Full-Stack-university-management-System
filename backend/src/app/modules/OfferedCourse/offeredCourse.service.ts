import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { AcademicFaculty } from '../AcademicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../AcademinDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../SemesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => { 

  //check if the semester registration id is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    payload.semesterRegistration,
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester is not Found');
  }
  // check if the academic Faculty is Exists
  const isAcademicFacultyExists = await AcademicFaculty.findById(
    payload.academicFaculty,
  );
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not Found');
  }
  // check if the  Faculty is Exists
  const isFacultyExists = await Faculty.findById(payload.faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' Faculty is not Found');
  }
  // check if the  course is Exists
  const isCourseExists = await Course.findById(payload.course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' Course is not Found');
  }
  // check if the  Department is Exists
  const isDepartmentExists = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      ' Academic Department is not Found',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
