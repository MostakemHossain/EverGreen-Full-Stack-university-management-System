import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validate.Request';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', validateRequest(StudentValidation.updateStudentValidationSchema), StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
