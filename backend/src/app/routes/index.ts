import express from 'express';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.routes';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
