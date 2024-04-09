import { z } from 'zod';

const createStudentNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1)
    .max(20),
  middleName: z.string().min(1).optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1)
    .max(20),
});

const createGuardianValidationSchema = z.object({
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

const createLocalGuardianValidationSchema = z.object({
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
  body: z.object({
    password: z.string(),
    student: z.object({
      name: createStudentNameValidationSchema,
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});
const updateStudentNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1)
    .max(20)
    .optional(),
  middleName: z.string().min(1).optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1)
    .max(20)
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string({
      required_error: 'Father name is required',
      invalid_type_error: 'Father name must be a string',
    })
    .min(1)
    .optional(),
  fatherOccupation: z
    .string({
      required_error: 'Father occupation is required',
      invalid_type_error: 'Father occupation must be a string',
    })
    .min(1)
    .optional(),
  fatherContactNumber: z
    .string({
      required_error: 'Father contact number is required',
      invalid_type_error: 'Father contact number must be a string',
    })
    .min(1)
    .optional(),
  motherName: z
    .string({
      required_error: 'Mother name is required',
      invalid_type_error: 'Mother name must be a string',
    })
    .min(1)
    .optional(),
  motherOccupation: z
    .string({
      required_error: 'Mother occupation is required',
      invalid_type_error: 'Mother occupation must be a string',
    })
    .min(1)
    .optional(),
  motherContactNumber: z
    .string({
      required_error: 'Mother contact number is required',
      invalid_type_error: 'Mother contact number must be a string',
    })
    .min(1)
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Local guardian name is required',
      invalid_type_error: 'Local guardian name must be a string',
    })
    .min(1)
    .optional(),
  occupation: z
    .string({
      required_error: 'Local guardian occupation is required',
      invalid_type_error: 'Local guardian occupation must be a string',
    })
    .min(1)
    .optional(),
  contactNumber: z
    .string({
      required_error: 'Local guardian contact number is required',
      invalid_type_error: 'Local guardian contact number must be a string',
    })
    .min(1)
    .optional(),
  address: z
    .string({
      required_error: 'Local guardian address is required',
      invalid_type_error: 'Local guardian address must be a string',
    })
    .min(1)
    .optional(),
  relation: z
    .string({
      required_error: 'Local guardian relation is required',
      invalid_type_error: 'Local guardian relation must be a string',
    })
    .min(1)
    .optional(),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateStudentNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
          invalid_type_error: 'Date of birth must be a string',
        })
        .min(1)
        .optional(),
      contactNumber: z
        .string({
          required_error: 'Contact number is required',
          invalid_type_error: 'Contact number must be a string',
        })
        .min(1)
        .optional(),
      emergencyContactNumber: z
        .string({
          required_error: 'Emergency contact number is required',
          invalid_type_error: 'Emergency contact number must be a string',
        })
        .min(1)
        .optional(),
      email: z
        .string({
          required_error: 'Email must be valid.',
          invalid_type_error: 'Email must be a string',
        })
        .email()
        .optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z
        .string({
          required_error: 'Present address is required',
          invalid_type_error: 'Present address must be a string',
        })
        .min(1)
        .optional(),
      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
          invalid_type_error: 'Permanent address must be a string',
        })
        .min(1)
        .optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      admissionSemester: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
