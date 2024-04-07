import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { StudentValidation } from '../student/student.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
export const UserRoutes = router;
