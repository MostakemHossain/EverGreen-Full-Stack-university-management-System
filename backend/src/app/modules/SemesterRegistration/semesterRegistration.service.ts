import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  //is current semester is already exists
  const isExistCurrentSemester = await SemesterRegistration.findOne({
    academicSemester: payload.academicSemester,
  });
  if (isExistCurrentSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is already exists');
  }
  // check if the academic semester exists
  const isAcademicSemesterExists = await AcademicSemester.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester is not Found');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
};
