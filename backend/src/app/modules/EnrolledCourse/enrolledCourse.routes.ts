import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { EnrolledCourseController } from './enrolledCourse.controller';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
const router = express.Router();
router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
