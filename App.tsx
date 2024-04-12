/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigator from './scr/components/NavigationComponent';
import {EventProvider} from './scr/components/context/EventContext';
import {AuthProvider} from './scr/components/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
