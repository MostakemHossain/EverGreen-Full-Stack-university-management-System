import { z } from 'zod';
const createUserValidationSchema = z.object({
  id: z.string(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be string',
  }),
  needsPasswordChange: z.boolean().optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().default(false),
});

export const UserValidation = {
  createUserValidationSchema,
};
