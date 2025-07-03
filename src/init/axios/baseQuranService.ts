import axios from 'axios';
import Config from 'react-native-config';
import { save } from '../../utils/storage';
import { store } from '../../store';
import { userActions } from '../../store/user/slice';
import Toast from 'react-native-toast-message';

export const accessQuranToken = 'accessQuranToken';
export const authAccessTokenHeaderName = 'Authorization';

const baseQuranService = axios.create({
  baseURL: 'http://beeapp.kz:16',
});

export const saveQuranTokens = async (access_token: string) => {
  await save(accessQuranToken, access_token);
};

export const setAuthQuranHeader = (access_token: string) => {
  baseQuranService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

baseQuranService.interceptors.response.use(
  response => {
    if (response.data && response.data[accessQuranToken]) {
      saveQuranTokens(response.data[accessQuranToken]);
      setAuthQuranHeader(response.data[accessQuranToken]);
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

export default baseQuranService;
