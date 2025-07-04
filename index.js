/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./service.ts'));
AppRegistry.registerComponent(appName, () => App);
