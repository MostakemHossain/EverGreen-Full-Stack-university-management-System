import httpStatus from 'http-status';
import QueryBuilder from '../../query/QueryBuilder';
import AppError from '../../utils/AppError';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // check if there is any registered semester that is already 'UPCOMING'|'ONGOING';
  const isThereAnyUpcomingOROnGoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOROnGoingSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `There is already an ${isThereAnyUpcomingOROnGoingSemester.status} semester registration.`,
    );
  }

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
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .fields()
    .filter()
    .sort()
    .paginate();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the requested semester is exists
  const isRequestedSemesterIsExists = await SemesterRegistration.findById(id);
  if (!isRequestedSemesterIsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester is not found');
  }

  // if the requested semester registration is ended,we won't update anything
  if (isRequestedSemesterIsExists?.status === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Requested semester is Already ENDED`,
    );
  }

  // UPCOMIN->ONGOING->ENDED
  if (
    isRequestedSemesterIsExists.status === RegistrationStatus.UPCOMING &&
    payload.status === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You cannot directly update UPCOMING to ENDED`,
    );
  }
  if (
    isRequestedSemesterIsExists.status === RegistrationStatus.ONGOING &&
    payload.status === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You cannot directly update ONGOING to UPCOMING`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
  updateSemesterRegistration,
};
