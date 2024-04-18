import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { USER_ROLE } from '../user/user.constant';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyController.getAllFaculty,
);
router.get(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  FacultyController.getSingleFaculty,
);
router.patch(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyController.deleteFaculty,
);

export const facultyRoutes = router;
