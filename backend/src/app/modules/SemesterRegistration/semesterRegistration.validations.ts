import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic Semester is required',
    }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
const updateSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string({
        required_error: 'Academic Semester is required',
      })
      .optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
};
