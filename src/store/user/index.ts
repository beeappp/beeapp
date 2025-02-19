import { useAppDispatch, useAppSelector } from '..';
import baseService, {
  authAccessTokenHeaderName,
} from '../../init/axios/baseService';
import { useSelector } from '../../utils/hooks';
import { remove } from '../../utils/storage';
import { userActions } from './slice';
import { loginUser } from './thunk/loginUser';
import { registerUser } from './thunk/registerUser';
import { resendValidation } from './thunk/resendValidation';
import { verifyCode } from './thunk/verifyCode';
import { CodeVerification, LoginRequest, RegisterRequest } from './types';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(userActions.removeUserDetails());
    remove('accessToken');
    remove('refreshToken');
    remove('user-keywords');
    delete baseService.defaults.headers.common[authAccessTokenHeaderName];
  };

  return {
    registerUser: async (registerData: RegisterRequest) =>
      dispatch(registerUser(registerData)).unwrap(),
    logout,
    loginUser: async (loginData: LoginRequest) =>
      dispatch(loginUser(loginData)).unwrap(),
    resendValidation: async (email: string) =>
      dispatch(resendValidation(email)).unwrap(),
    verifyCode: async (param: CodeVerification) =>
      dispatch(verifyCode(param)).unwrap(),
    currentUser: useAppSelector(({ user }) => user.user),
    isLoading: useSelector(({ user }) => user.isLoading),
    isAuthorized: useSelector(({ user }) => user.isAuthorized),
    setAuthorize: (state: boolean) => dispatch(userActions.setAuthorize(state)),
  };
};
