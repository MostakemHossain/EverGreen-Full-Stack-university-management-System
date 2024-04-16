import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course field is required',
    }),
  }),
});
export const EnrolledCourseValidation = {
  createEnrolledCourseValidationSchema,
};
