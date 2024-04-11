import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(1)
    .max(20),
  middleName: z.string().max(20).optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string({
        required_error: 'Designation is required',
      }),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z
        .string({
          required_error: 'Valid email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact no is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact no is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateUserNameValidationSchema,
      designation: z.string().max(30).optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
