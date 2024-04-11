import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z
  .string({
    required_error: ' Time field is required',
  })
  .refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    },
    {
      message: 'Invalid time format. expected HH:MM in 24 hours',
    },
  );
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
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
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time  must be before End time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
    body: z
      .object({
        faculty: z.string(),
        maxCapacity: z.number(),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: timeStringSchema, // HH: MM   00-23: 00-59
        endTime: timeStringSchema,
      })
      .refine(
        (body) => {
          // startTime : 10:30  => 1970-01-01T10:30
          //endTime : 12:30  =>  1970-01-01T12:30
  
          const start = new Date(`1970-01-01T${body.startTime}:00`);
          const end = new Date(`1970-01-01T${body.endTime}:00`);
  
          return end > start;
        },
        {
          message: 'Start time should be before End time !  ',
        },
      ),
  });

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
