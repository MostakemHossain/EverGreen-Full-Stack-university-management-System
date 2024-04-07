import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create new user object
  const user: Partial<TUser> = {};

  // if password is not given use default password
  user.password = password || (config.default_password as string);
  // set role
  user.role = 'student';
  // generated is
  user.id = '2030100001';

  // create a user
  const newUser = await User.create(user);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
  }
  const newStudent = await Student.create(payload);
  return newStudent;
};
export const UserServices = {
  createStudentIntoDB,
};
