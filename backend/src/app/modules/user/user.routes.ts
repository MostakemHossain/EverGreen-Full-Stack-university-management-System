import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';
import { UserController } from './user.controller';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRoutes = router;
