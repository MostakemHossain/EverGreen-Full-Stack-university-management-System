import { TLoginUser } from './auth.interface';

const loginUser = (payload: TLoginUser) => {
    console.log(payload)
};

export const AuthServices = {
  loginUser,
};
