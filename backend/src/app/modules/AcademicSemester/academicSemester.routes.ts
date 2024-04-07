import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { academicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
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
router.patch('/:semesterId', academicSemesterController.updateAcademicSemester);
router.delete(
  '/:semesterId',
  academicSemesterController.deleteAcademicSemester,
);

export const AcademicSemesterRoutes = router;
