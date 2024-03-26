import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudenFromDb = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getSingleStudenFromDb,
};
