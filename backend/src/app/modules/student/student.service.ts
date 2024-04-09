import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../query/QueryBuilder';
import AppError from '../../utils/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './studentConstants';

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  //   const queryObj = { ...query };
  //   let searchTerm = '';
  //   if (query.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }

  //   const searchQuery = Student.find({
  //     $or: studentSearchableFields.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });
  //   // filtering
  //   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });

  //   let sort = '-createdAt';
  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort);

  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;
  //   if (query.limit) {
  //     limit = Number(query.limit);
  //   }
  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);

  //   // field limiting
  //   let fields = '-__v';
  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //   }
  //   const fieldQuery = await limitQuery.select(fields);

  //   return fieldQuery;
  const studentQuery = new QueryBuilder(Student.find() .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  }), query)
    .search(studentSearchableFields)
    .paginate()
    .sort()
    .filter()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudenFromDb = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Student');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
  }
  return null;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData)
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentFromDb,
  getSingleStudenFromDb,
  deleteStudentFromDb,
  updateStudentFromDB,
};
