// MenuScreen.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderComponent from '../components/header/HeaderComponent';
import colors from '../colors/colors';
import MenuListComponent from '../components/menu/MenuListComponent';
import globalStyle from '../assets/styles/globalStyle';
import LogOutButton from '../components/button/LogOutButton';
import {logoutUser} from '../components/Api/Login-out';

const MenuScreen = ({navigation}) => {
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
    const sessionId = "the_actual_session_id"; // This should be dynamically obtained

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
