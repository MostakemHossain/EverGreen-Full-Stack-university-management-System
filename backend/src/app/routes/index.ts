import express from 'express';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.routes';
import { AcademicDepartmentRoutes } from '../modules/AcademinDepartment/academicDepartment.routes';
import { facultyRoutes } from '../modules/Faculty/faculty.routes';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
