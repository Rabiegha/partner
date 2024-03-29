// MenuScreen.js
import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import HeaderComponent from '../components/elements/header/HeaderComponent';
import colors from '../colors/colors';
import MenuListComponent from '../components/screens/menu/MenuListComponent';
import globalStyle from '../assets/styles/globalStyle';
import LogOutButton from '../components/elements/buttons/LogOutButton';
import {logoutUser} from '../components/api/Login-out';
import {useFocusEffect} from '@react-navigation/native';

const MenuScreen = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content'); // Set status bar style to light-content
      return () => {
        StatusBar.setBarStyle('default'); // Reset status bar style when screen loses focus
      };
    }, []),
  );
  const sections = [
    {
      title: 'Menu',
      buttons: [
        {title: 'Participants', action: () => navigation.navigate('Attendees')},
        {title: 'Ajouts', action: () => navigation.navigate('Add')},
        {title: 'Scan', action: () => navigation.navigate('Scann')},
        {title: 'Scan', action: () => navigation.navigate('Scann')},
      ],
    },
    {
      title: 'Aide & Support',
      buttons: [
        {title: 'À propos', action: () => navigation.navigate('About')},
        {title: 'Centre d’aide', action: () => navigation.navigate('Help')},
      ],
    },
    // Add more sections as needed
  ];
  const handleLogout = () => {
    const sessionId = 'the_actual_session_id'; // This should be dynamically obtained

    logoutUser(sessionId);
  };

  return (
    <View style={globalStyle.backgroundBlack}>
      <HeaderComponent
        title={'Outils'}
        color={colors.greyCream}
        handlePress={() => navigation.navigate('Attendees')}
      />
      <View style={globalStyle.container}>
        <View style={{top: 60}}>
          <MenuListComponent sections={sections} />
          <LogOutButton onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MenuScreen;
