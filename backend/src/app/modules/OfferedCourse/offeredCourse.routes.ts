import express from 'express';
import validateRequest from '../../middleware/validate.Request';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.get("/",OfferedCourseController.getAllOfferedCourse)
router.get("/:id",OfferedCourseController.getSingleOfferedCourse)
router.patch("/:id",validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),OfferedCourseController.updateOfferedCourse)

export const OfferedCourseRoutes = router;
