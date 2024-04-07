import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create new user object
  const user: Partial<TUser> = {};

  // if password is not given use default password
  user.password = password || (config.default_password as string);
  // set role
  user.role = 'student';

  // find academic semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  // generated id
  user.id = await generateStudentId(admissionSemester);

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
