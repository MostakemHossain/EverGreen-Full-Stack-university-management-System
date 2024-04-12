import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  status: 'in-progress' | 'blocked';
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
