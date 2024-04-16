import { Schema, model } from 'mongoose';
import { Grade } from './enrolledCourse.constant';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: { type: Number, default: 0 },
    classTest2: { type: Number, default: 0 },
    classTest3: { type: Number, default: 0 },
    assignment: { type: Number, default: 0 },
    presentation: { type: Number, default: 0 },
    midTerm: { type: Number, default: 0 },
    finalTerm: { type: Number, default: 0 },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistration',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Faculty',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'OfferedCourse',
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    courseMarks: {
      type: courseMarksSchema,
    },
    grade: {
      type: String,
      enum: Grade,
      default: 'N/A',
    },
    gradePoints: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export const enrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
