import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validations';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
router.get('/', semesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.delete(
    '/:id',
    semesterRegistrationController.deleteSemesterRegistration,
  );
export const semesterRegistrationRoutes = router;
