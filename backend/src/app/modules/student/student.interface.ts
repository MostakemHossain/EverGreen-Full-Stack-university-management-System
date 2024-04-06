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
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
