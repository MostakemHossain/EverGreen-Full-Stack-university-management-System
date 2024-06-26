import { z } from 'zod';
const preRequisiteCourseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'course title is required',
    }),
    prefix: z.string({
      required_error: 'Course prefix is required',
    }),
    code: z.number({
      required_error: 'course code is required',
    }),
    credits: z.number({
      required_error: 'course credits is required',
    }),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'course title is required',
      })
      .optional(),
    prefix: z
      .string({
        required_error: 'Course prefix is required',
      })
      .optional(),
    code: z
      .number({
        required_error: 'course code is required',
      })
      .optional(),
    credits: z
      .number({
        required_error: 'course credits is required',
      })
      .optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
  }),
});

const assignFacultyWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultyWithCourseValidationSchema,
};
