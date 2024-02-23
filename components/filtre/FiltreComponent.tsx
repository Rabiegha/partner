// MenuScreen.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderComponent from '../header/HeaderComponent';
import colors from '../../colors/colors';
import globalStyle from '../../assets/styles/globalStyle';
import FiltreDetailsComponent from './FiltreDetailsComponent';
import RedBorderButton from '../button/RedBorderButton';
import LargeButton from '../button/LargeButton';
import AppliquerButton from '../button/AppliquerButton';

const FiltreComponent = ({handlePress}) => {
  const sections = [
    {
      title: 'Etats',
      buttons: [
        {title: 'Tous les participants'},
        {title: 'Checked-in'},
        {title: 'Not checked-in'},
      ],
    },
    {
      title: 'Ordre',
      buttons: [{title: 'Plus récent'}, {title: 'Moins récent'}],
    },
    // Add more sections as needed
  ];

  return (
    <View style={globalStyle.backgroundBlack}>
      <HeaderComponent
        title={'Filtre'}
        color={colors.greyCream}
        handlePress={handlePress}
      />
      <View style={[globalStyle.container, globalStyle.container]}>
        <View>
          <FiltreDetailsComponent sections={sections} />
        </View>
        <AppliquerButton onPress={undefined} Titre={'Appliquer'} />
        <RedBorderButton onPress={undefined} Titre={'Annuler'} />
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

export default FiltreComponent;
