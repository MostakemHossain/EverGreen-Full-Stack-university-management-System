import httpStatus from 'http-status';
import QueryBuilder from '../../query/QueryBuilder';
import AppError from '../../utils/AppError';
import { AcademicFaculty } from '../AcademicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../AcademinDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegistration } from '../SemesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { Student } from '../student/student.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    academicFaculty,
    academicDepartment,
    semesterRegistration,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
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

  // check if the depertment belongs to the faculty
  const isDepartmentbelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentbelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this ${isDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`,
    );
  }

  // if the same course same section already exists
  const isSameOfferedCourseExistsWithSameRegistrationSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegistrationSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course is same section is already exists`,
    );
  }

  // get the schedules of offered course
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This faculty is not available at this time`,
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await offeredCourseQuery.countTotal();
  const result = await offeredCourseQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const updateCourseFromDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'days' | 'startTime' | 'endTime' | 'maxCapacity'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This offered course is not found',
    );
  }

  // check if the  Faculty is Exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, ' Faculty is not Found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const SemesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (SemesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot update this offered course',
    );
  }
  // get the schedules of offered course
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This faculty is not available at this time`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const myOfferedCourses = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const student = await Student.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is noty found');
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: 'ONGOING',
    },
  );

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no ongoing semester registration!',
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentOngoingRegistrationSemester',
                    ],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;

  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateCourseFromDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  myOfferedCourses,
};
