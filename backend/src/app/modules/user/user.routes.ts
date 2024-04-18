import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validate.Request';
import { upload } from '../../utils/sendImageToCloudinary';
import { AdminValidations } from '../Admin/admin.validation';
import { FacultyValidations } from '../Faculty/faculty.validation';
import { StudentValidation } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
router.post('/me', auth('student', 'faculty', 'admin','superAdmin'), UserController.getMe);
router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);
export const UserRoutes = router;
