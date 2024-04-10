import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Semester Registration field is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty field is required',
    }),
    academicDepartment: z.string({
      required_error: 'Academic Department field is required',
    }),
    course: z.string({
      required_error: 'Course field is required',
    }),
    faculty: z.string({
      required_error: 'Faculty field is required',
    }),
    maxCapacity: z.number(),
    section: z.string({
      required_error: 'Section field is required',
    }),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string({
      required_error: 'Start Time field is required',
    }),
    endTime: z.string({
      required_error: 'End Time field is required',
    }),
  }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z
      .string({
        required_error: 'Faculty field is required',
      })
      .optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z
      .string({
        required_error: 'Start Time field is required',
      })
      .optional(),
    endTime: z
      .string({
        required_error: 'End Time field is required',
      })
      .optional(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
