import { Types } from 'mongoose';

export type TDays = 'SAT' | 'SUN' | 'MON' | 'TUES' | 'WED' | 'THURS' | 'FRI';
export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: string;
  days: TDays[];
  startTime: string;
  endTime: string;
};
