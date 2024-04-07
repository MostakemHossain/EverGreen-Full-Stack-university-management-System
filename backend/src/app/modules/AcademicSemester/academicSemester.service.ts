import { AcademicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (AcademicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const academicSemesterService = {
  createAcademicSemester,
};
