// MenuScreen.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderComponent from '../elements/header/HeaderComponent';
import colors from '../../../colors/colors';
import globalStyle from '../../assets/styles/globalStyle';
import FiltreDetailsComponent from './FiltreDetailsComponent';
import RedBorderButton from '../elements/buttons/RedBorderButton';
import LargeButton from '../elements/buttons/LargeButton';
import AppliquerButton from '../elements/buttons/AppliquerButton';

const FiltreComponent = ({
  handlePress,
  filterCriteria,
  setFilterCriteria,
  tout,
  checkedIn,
  notChechkedIn,
}) => {
  const sections = [
    {
      title: 'Etats',
      buttons: [
        {title: 'Tous les participants'},
        {title: 'Checked-in'},
        {title: 'Not checked-in'},
      ],
    },
    // Add more sections as needed
  ];
  const applyFilter = () => {
    // Assuming you have logic here to determine the new filter criteria
    const newCriteria = {...filterCriteria}; // Modify as necessary based on the selected filter
    setFilterCriteria(newCriteria);
    handlePress(); // Close the modal
  };

  return (
    <View style={globalStyle.backgroundBlack}>
      <HeaderComponent
        title={'Filtre'}
        color={colors.greyCream}
        handlePress={handlePress}
      />
      <View style={[globalStyle.container, globalStyle.container]}>
        <View>
          {filterCriteria && (
            <FiltreDetailsComponent
              filterCriteria={filterCriteria}
              setFilterCriteria={setFilterCriteria}
              tout={tout}
              checkedIn={checkedIn}
              notChechkedIn={notChechkedIn}
            />
          )}
        </View>
        <RedBorderButton onPress={() => handlePress()} Titre={'Fermer'} />
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
