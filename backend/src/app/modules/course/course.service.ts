import QueryBuilder from '../../query/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
  // step 1:basic course info update
  const updateBasicInfo = await Course.findByIdAndUpdate(id, remainingData, {
    new: true,
  });

  // check if there is any pre requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out is deleted prerequsites
    const deletedPreRequsites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((e) => e.course);

    const deletedPreRequsitesCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequsites } } },
    });

    // filterout new course
    const newPreRequsites = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequsitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequsites } },
    });
  }
  const result = await Course.findById(id).populate('preRequisiteCourses.course');
  return {
    result,
  };
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourse,
};
