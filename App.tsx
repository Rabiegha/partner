/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MoreScreen from './screens/More';
import AddAttendeesScreen from './screens/AddAttendees';
import HomeScreen from './screens/Home';
import MenuScreen from './screens/Menu';
import QRCodeScannerScreen from './screens/Scann';
import ModalFilter from './components/modals/ModalFilter';
import colors from './colors/colors';
import AttendeesScreen from './screens/Attendees';
import BadgeScreen from './screens/Badge';
import AboutScreen from './screens/About';
import HelpScreen from './screens/Help';
import ConnexionScreen from './screens/Connexion';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomTabButton({children, onPress}) {
  return (
    <TouchableOpacity style={{flex: 1}} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
function ScanButton({children, onPress}) {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 90,
          height: 60,
          borderRadius: 20,
          backgroundColor: colors.green,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

function TabNavigator() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 70,
            backgroundColor: colors.darkGrey,
            ...styles.shadow,
          },
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.greyCream,
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Attendees"
          component={AttendeesScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../app/assets/images/icons/Participant.png')}
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: focused ? colors.green : colors.greyCream,
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.green : colors.greyCream,
                    fontSize: 8,
                  }}>
                  Participants
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={AddAttendeesScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../app/assets/images/icons/Ajouts.png')}
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: focused ? colors.green : colors.greyCream,
                  }}
                />
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: focused ? colors.green : colors.greyCream,
                    fontSize: 8,
                  }}>
                  Ajouts
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Scann"
          component={AddAttendeesScreen}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../app/assets/images/icons/Scan.png')}
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 60,
                  height: 60,
                  tintColor: colors.greyCream,
                }}
              />
            ),
            tabBarButton: props => <ScanButton {...props} />,
            tabBarStyle: {display: 'none'},
          })}
        />

        <Tab.Screen
          name="Filtre"
          component={HomeScreen} // Dummy component
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
              openFilterModal();
            },
          }}
          options={{
            tabBarButton: props => (
              <CustomTabButton {...props} onPress={openFilterModal} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Image
                  source={require('../app/assets/images/icons/Outils.png')}
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: focused ? colors.green : colors.greyCream,
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.green : colors.greyCream,
                    fontSize: 8,
                  }}>
                  Outils
                </Text>
              </View>
            ),
            tabBarStyle: {display: 'none'},
          }}
        />
      </Tab.Navigator>
      <ModalFilter
        isVisible={isFilterModalVisible}
        closeModal={closeFilterModal}
      />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Events" component={HomeScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="More" component={MoreScreen} />
        <Stack.Screen name="Badge" component={BadgeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;

