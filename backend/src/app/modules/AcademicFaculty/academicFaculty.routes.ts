import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create-academic-faculty', AcademicFacultyController.createAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRoutes = router;
