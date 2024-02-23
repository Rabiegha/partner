// MenuScreen.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderComponent from '../components/header/HeaderComponent';
import colors from '../colors/colors';
import MenuListComponent from '../components/menu/MenuListComponent';
import globalStyle from '../assets/styles/globalStyle';

const AboutScreen = ({navigation}) => {
  const sections = [
    {
      title: 'Menu',
      buttons: [
        {title: 'House rules', action: () => navigation.navigate('Attendees')},
        {title: 'Privacy policy', action: () => navigation.navigate('Add')},
        {title: 'Terms of use', action: () => navigation.navigate('Scann')},
        {title: 'Cookies', action: () => navigation.navigate('Scann')},
      ],
    },
  ];

  return (
    <View style={globalStyle.backgroundBlack}>
      <HeaderComponent
        title={'À propos'}
        color={colors.greyCream}
        handlePress={() => navigation.goBack()}
      />
      <View style={globalStyle.container}>
        <View style={{top: 60}}>
          <MenuListComponent sections={sections} />
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

export default AboutScreen;
