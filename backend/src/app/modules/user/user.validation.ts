import { z } from 'zod';
import { USER_STATUS } from './user.constant';
const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...(USER_STATUS as [string, ...string[]])]),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  changeStatusValidationSchema,
};
