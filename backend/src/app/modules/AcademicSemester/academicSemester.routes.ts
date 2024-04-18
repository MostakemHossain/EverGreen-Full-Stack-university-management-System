import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { USER_ROLE } from '../user/user.constant';
import { academicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get('/', academicSemesterController.getAllAcademicSemester);
router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  academicSemesterController.updateAcademicSemester,
);
router.delete(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  academicSemesterController.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = router;
