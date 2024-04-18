import express from 'express';
import validateRequest from '../../middleware/validate.Request';

import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourses,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.updateCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.deleteCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  CourseControllers.getFacultiesWithCourse,
);
router.put(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse,
);

export const CourseRoutes = router;
