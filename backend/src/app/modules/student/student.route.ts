import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { USER_ROLE } from '../user/user.constant';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getAllStudents,
);
router.get(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.faculty),
  StudentController.getSingleStudent,
);
router.patch(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(StudentValidation.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.deleteStudent,
);

export const StudentRoutes = router;
