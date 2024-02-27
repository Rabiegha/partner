import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, TextInput} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import globalStyle from '../assets/styles/globalStyle';
import EventPasseesScreen from './EventsPassees';
import EventAvenirScreen from './EventsAvenir';
import {NavigationContainer} from '@react-navigation/native';
import colors from '../colors/colors';
import Search from '../components/search/Search';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

// Créez une fonction pour votre navigation d'onglets
function MyTabs({searchQuery, onPress}) {
  return (
    <Tab.Navigator
      initialRouteName="A venir"
      screenOptions={{
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.grey,
        tabBarIndicatorStyle: {
          backgroundColor: colors.green,
          height: 14,
          borderRadius: 15,
        },
        tabBarStyle: {backgroundColor: 'white', elevation: 0},
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name="A venir">
        {() => (
          <EventAvenirScreen searchQuery={searchQuery} onPress={onPress} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Passées">
        {() => (
          <EventPasseesScreen searchQuery={searchQuery} onPress={onPress} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Composant principal EventsScreen
const Events1Screen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  const handlePress = item => {
    navigation.navigate('Tabs', {
      screen: 'Attendees',
      params: {},
    });
  };

  return (
    <NavigationContainer independent={true}>
      <View style={[globalStyle.backgroundWhite, globalStyle.container]}>
        <Search onChange={text => setSearchQuery(text)} />
        <MyTabs searchQuery={searchQuery} onPress={handlePress} />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Events1Screen;
