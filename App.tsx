import React from 'react';
import {AppNavigation} from '@navigations';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { AuthProvider } from '@contexts';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
        <AppNavigation />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
