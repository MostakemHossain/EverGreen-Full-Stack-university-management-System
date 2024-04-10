import express from 'express';
import validateRequest from '../../middleware/validate.Request';

import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch('/:id', CourseControllers.updateCourse);
router.delete('/:id', CourseControllers.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

export const CourseRoutes = router;
