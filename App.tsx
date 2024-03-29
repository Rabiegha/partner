/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {EventProvider} from './components/context/EventContext';
import AppNavigator from './components/NavigationComponent';

function App() {
  return (
    <EventProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </EventProvider>
  );
}

export default App;
