import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddAttendeesComponent from '../components/form/AddAttendeesComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import ParticipantAjoute from '../components/notification/SuccessComponent';
import globalStyle from '../assets/styles/globalStyle';

const AddAttendeesScreen = ({navigation}) => {
  const handleGoBack = () => {
    navigation.navigate('Attendees');
  };
  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderComponent
        title="Attendees"
        color={undefined}
        handlePress={handleGoBack}
      />
      <AddAttendeesComponent style={globalStyle.container} />
    </View>
  );
};

export default AddAttendeesScreen;
