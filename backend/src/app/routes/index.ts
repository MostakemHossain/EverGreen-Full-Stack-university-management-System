import express from 'express';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.routes';
import { AcademicDepartmentRoutes } from '../modules/AcademinDepartment/academicDepartment.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { facultyRoutes } from '../modules/Faculty/faculty.routes';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/offeredCourse.routes';
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
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
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semesters',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
