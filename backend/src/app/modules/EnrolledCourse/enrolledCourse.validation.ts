import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course field is required',
    }),
  }),
});

const updateEnrolledCourseMarksValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      classTest2: z.number().optional(),
      classTest3: z.number().optional(),
      assignment: z.number().optional(),
      presentation: z.number().optional(),
      midTerm: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});
export const EnrolledCourseValidation = {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseMarksValidationSchema,
};
