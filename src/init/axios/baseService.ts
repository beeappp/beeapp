import axios from 'axios';
import Config from 'react-native-config';
import { save } from '../../utils/storage';
import { store } from '../../store';
import { userActions } from '../../store/user/slice';
import Toast from 'react-native-toast-message';

export const accessToken = 'accessToken';

export const authAccessTokenHeaderName = 'Authorization';

const baseService = axios.create({
  baseURL: `${Config.API_KEY}`,
});

export const saveTokens = async (access_token: string) => {
  await save(accessToken, access_token);
};

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

baseService.interceptors.response.use(
  response => {
    if (response.data && response.data[accessToken]) {
      saveTokens(response.data[accessToken]);
      setAuthHeader(response.data[accessToken]);
    }
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      console.log('Error logout', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Сессияңыз аяқталды. Қайта кіруіңізді сұраймыз.',
      });
      store.dispatch(userActions.setAuthorize(false));
    }
    return Promise.reject(error);
  }
);

export default baseService;
