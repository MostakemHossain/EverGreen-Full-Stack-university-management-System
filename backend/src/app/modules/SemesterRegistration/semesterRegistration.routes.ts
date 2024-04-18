import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { USER_ROLE } from '../user/user.constant';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validations';
const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidation.createSemesterValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidation.updateSemesterValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationController.deleteSemesterRegistration,
);
export const semesterRegistrationRoutes = router;
