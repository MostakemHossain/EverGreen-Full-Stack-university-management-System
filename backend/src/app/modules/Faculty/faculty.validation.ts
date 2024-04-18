import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createFacultyUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be string',
    })
    .min(1)
    .max(20),
  middleName: z.string(),
  lastName: z.string({
    required_error: 'Last name is reqpired',
    invalid_type_error: 'Last name must be string',
  }),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string({
        required_error: 'designation is required',
        invalid_type_error: 'designation must be string',
      }),
      name: createFacultyUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string({
        required_error: 'dateOfBirth is required',
        invalid_type_error: 'dateOfBirth must be string',
      }),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be string',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact No is required',
        invalid_type_error: 'Contact no must be string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
        invalid_type_error: 'Emergency Contact no must be string',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
        invalid_type_error: 'presentAddress  must be string',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
        invalid_type_error: 'permanentAddress  must be string',
      }),
      academicDepartment: z.string({
        required_error: 'academic Department is required',
        invalid_type_error: 'academic Department  must be string',
      }),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateFacultyUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: updateFacultyUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
    }),
  }),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
