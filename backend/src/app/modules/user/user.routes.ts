import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { AdminValidations } from '../Admin/admin.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRoutes = router;
