import express from 'express';
import { FacultyController } from './faculty.controller';
const router = express.Router();

router.get('/', FacultyController.getAllFaculty);

export const facultyRoutes = router;
