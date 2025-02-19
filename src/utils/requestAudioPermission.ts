import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  } else {
    await request(PERMISSIONS.IOS.MICROPHONE);
  }
};
