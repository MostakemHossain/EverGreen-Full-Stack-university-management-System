import QueryBuilder from '../../query/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(FacultySearchableFields)
    .sort()
    .filter()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

export const FacultyService = {
  getAllFacultyFromDB,
};
