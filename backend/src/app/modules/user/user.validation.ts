import { z } from 'zod';
const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .optional(),
});

export const UserValidation = {
  createUserValidationSchema,
};
