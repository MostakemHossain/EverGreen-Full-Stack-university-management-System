import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  semesterRegistrationController.createSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
