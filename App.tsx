import React, { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AppNavigator from './src/navigator/appNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//store
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

//network
import NetInfo from '@react-native-community/netinfo';

//language init
import './i18n';

//jotai
import { useSetAtom } from 'jotai';
import {
  cellularGenerationAtom,
  isInternetAvailableAtom,
} from './src/tools/atoms/common';
import JotaiNexus from 'jotai-nexus';

const App = () => {
  const cellularGeneration = useSetAtom(cellularGenerationAtom);
  const setIsInternetAvailable = useSetAtom(isInternetAvailableAtom);

  useEffect(() => {
    const status = NetInfo.addEventListener(state => {
      const status = (state.isConnected && state.isInternetReachable) || false;
      setIsInternetAvailable(status);
      if (state.type === 'cellular') {
        cellularGeneration(state.details.cellularGeneration);
      } else {
        // console.log(state.details);
      }
    });

    return status;
  }, [NetInfo]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <JotaiNexus />
        <MenuProvider skipInstanceCheck>
          <GluestackUIProvider config={config}>
            <GestureHandlerRootView>
              <PortalProvider>
                <AppNavigator />
              </PortalProvider>
            </GestureHandlerRootView>
          </GluestackUIProvider>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
