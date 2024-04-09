import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
export const UserRoutes = router;
