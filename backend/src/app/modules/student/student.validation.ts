import { z } from 'zod';

const studentNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1)
    .max(20),
  middleName: z.string().min(1),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1)
    .max(20),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string({
      required_error: 'Father name is required',
      invalid_type_error: 'Father name must be a string',
    })
    .min(1),
  fatherOccupation: z
    .string({
      required_error: 'Father occupation is required',
      invalid_type_error: 'Father occupation must be a string',
    })
    .min(1),
  fatherContactNumber: z
    .string({
      required_error: 'Father contact number is required',
      invalid_type_error: 'Father contact number must be a string',
    })
    .min(1),
  motherName: z
    .string({
      required_error: 'Mother name is required',
      invalid_type_error: 'Mother name must be a string',
    })
    .min(1),
  motherOccupation: z
    .string({
      required_error: 'Mother occupation is required',
      invalid_type_error: 'Mother occupation must be a string',
    })
    .min(1),
  motherContactNumber: z
    .string({
      required_error: 'Mother contact number is required',
      invalid_type_error: 'Mother contact number must be a string',
    })
    .min(1),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Local guardian name is required',
      invalid_type_error: 'Local guardian name must be a string',
    })
    .min(1),
  occupation: z
    .string({
      required_error: 'Local guardian occupation is required',
      invalid_type_error: 'Local guardian occupation must be a string',
    })
    .min(1),
  contactNumber: z
    .string({
      required_error: 'Local guardian contact number is required',
      invalid_type_error: 'Local guardian contact number must be a string',
    })
    .min(1),
  address: z
    .string({
      required_error: 'Local guardian address is required',
      invalid_type_error: 'Local guardian address must be a string',
    })
    .min(1),
  relation: z
    .string({
      required_error: 'Local guardian relation is required',
      invalid_type_error: 'Local guardian relation must be a string',
    })
    .min(1),
});

const createStudentValidationSchema = z.object({
  id: z.string({
    required_error: 'Id is required',
    invalid_type_error: 'Id must be string',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
  name: studentNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z
    .string({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Date of birth must be a string',
    })
    .min(1),
  contactNumber: z
    .string({
      required_error: 'Contact number is required',
      invalid_type_error: 'Contact number must be a string',
    })
    .min(1),
  emergencyContactNumber: z
    .string({
      required_error: 'Emergency contact number is required',
      invalid_type_error: 'Emergency contact number must be a string',
    })
    .min(1),
  email: z
    .string({
      required_error: 'Email must be valid.',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z
    .string({
      required_error: 'Present address is required',
      invalid_type_error: 'Present address must be a string',
    })
    .min(1),
  permanentAddress: z
    .string({
      required_error: 'Permanent address is required',
      invalid_type_error: 'Permanent address must be a string',
    })
    .min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export const StudentValidation = {
  createStudentValidationSchema,
};
