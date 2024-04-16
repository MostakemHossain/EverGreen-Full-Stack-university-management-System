import { Types } from 'mongoose';
export type TGrade =
  | 'A'
  | 'A-'
  | 'A+'
  | 'B'
  | 'B-'
  | 'B+'
  | 'C'
  | 'C+'
  | 'D'
  | 'F'
  | 'N/A';
export type TCourseMarks = {
  classTest1: number;
  classTest2: number;
  classTest3: number;
  assignment: number;
  presentation: number;
  midTerm: number;
  finalTerm: number;
};
export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
