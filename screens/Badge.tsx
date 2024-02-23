import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../components/header/HeaderComponent';
import colors from '../colors/colors';
import globalStyle from '../assets/styles/globalStyle';
import BadgeComponent from '../components/badge/BadgeComponent';

const BadgeScreen = ({route, navigation}) => {
  console.log('MoreScreen route.params:', route.params);

  const {itemName} = route.params || {};
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderComponent
        title={''}
        handlePress={handleBackPress}
        color={colors.green}
      />
      <View style={globalStyle.container}>
        <BadgeComponent>{itemName}</BadgeComponent>
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
  itemName: {
    fontSize: 18,
    top: 50,
  },
});

export default BadgeScreen;
