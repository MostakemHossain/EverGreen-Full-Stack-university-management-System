import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  status: 'in-progress' | 'blocked';
  role: 'superAdmin' | 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  passwordChangeAt?: Date;
};

export type TUserRole = keyof typeof USER_ROLE;
