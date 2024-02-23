import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../components/header/HeaderComponent';
import MoreComponent from '../components/more/MoreComponent';
import colors from '../colors/colors';
import globalStyle from '../assets/styles/globalStyle';

const MoreScreen = ({route, navigation}) => {
  console.log('MoreScreen route.params:', route.params);

  const {itemName} = route.params || {};
  const handleBackPress = () => {
    // Define what happens when back is pressed. For example:
    navigation.goBack(); // This uses React Navigation's goBack function
  };
  const handleBadgePress = () => {
    // Define what happens when back is pressed. For example:
    navigation.navigate('Badge'); // This uses React Navigation's goBack function
  };

  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderComponent
        title={'Profil'}
        handlePress={handleBackPress}
        color={colors.darkGrey}
      />
      <View style={globalStyle.container}>
        <MoreComponent pressHandle={handleBadgePress}>{itemName}</MoreComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
  },
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

export default MoreScreen;
