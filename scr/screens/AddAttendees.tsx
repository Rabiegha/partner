import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import AddAttendeesComponent from '../components/screens/AddAttendeesComponent';
import HeaderComponent from '../components/elements/header/HeaderComponent';
import { useFocusEffect } from '@react-navigation/native';
import globalStyle from '../assets/styles/globalStyle';
import { useEvent } from '../context/EventContext';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const AddAttendeesScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, [])
  );

  const [success, setSuccess] = useState(null);
  const { secretCode, eventId, addAttendee, triggerListRefresh } = useEvent();

  const handleEnregistrer = async (newAttendee) => {
    console.log('New Attendee:', newAttendee);

    try {
      const response = await axios.post(`${BASE_URL}/add_attendee`, {
        event_id: eventId,
        attendee: newAttendee,
      });

      if (response.data.status) {
        console.log('Server Response:', response.data.attendee);

        addAttendee(eventId, response.data.attendee);
        setSuccess(true);

        // Ajouter des journaux pour vérifier les données après l'ajout
        console.log('Triggering list refresh...');
        triggerListRefresh();
        console.log('List refresh triggered');
        
        navigation.navigate('Attendees');
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error adding attendee:', error);
      setSuccess(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => setSuccess(null);
    }, [])
  );

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
      <AddAttendeesComponent
        onPress={handleEnregistrer}
        style={[globalStyle.container, { marginTop: 50 }]}
      />
    </View>
  );
};

export default AddAttendeesScreen;
