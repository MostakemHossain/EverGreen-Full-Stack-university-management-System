import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:facultyId', FacultyController.getSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:facultyId', FacultyController.deleteFaculty);

export const facultyRoutes = router;
