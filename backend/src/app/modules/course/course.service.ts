import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../query/QueryBuilder';
import AppError from '../../utils/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // step 1:basic course info update
    const updateBasicCourse = await Course.findByIdAndUpdate(
      id,
      remainingData,
      {
        new: true,
        session,
      },
    );

    if (!updateBasicCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out is deleted prerequsites
      const deletedPreRequsites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((e) => e.course);

      const deletedPreRequsitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequsites } },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!deletedPreRequsitesCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filterout new course
      const newPreRequsites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequsitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequsites } },
        },
        {
          new: true,
          session,
        },
      );

      if (!newPreRequsitesCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
      await session.commitTransaction();
      await session.endSession();
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return {
    result,
  };
};

const assignFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourse,
  assignFacultiesWithCourse,
};
