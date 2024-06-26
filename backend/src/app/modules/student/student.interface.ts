/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
  relation: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage?: string;
  isDeleted: boolean;
};

export interface TStudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
