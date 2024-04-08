import { z } from 'zod';
const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
};
