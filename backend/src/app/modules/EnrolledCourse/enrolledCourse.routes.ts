import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { USER_ROLE } from '../user/user.constant';
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
router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidation.updateEnrolledCourseMarksValidationSchema,
  ),
  EnrolledCourseController.updateEnrolledOfferedCourseMarks,
);
router.get(
  '/',
  auth(USER_ROLE.faculty),
  EnrolledCourseController.getAllEnrolledCourses,
);

export const EnrolledCourseRoutes = router;
