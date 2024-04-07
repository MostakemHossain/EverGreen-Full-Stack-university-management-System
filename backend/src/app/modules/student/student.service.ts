import { Student } from './student.model';

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudenFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentServices = {
  getAllStudentFromDb,
  getSingleStudenFromDb,
  deleteStudentFromDb,
};
