import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from '../components/elements/header/HeaderComponent';
import MoreComponent from '../components/screens/MoreComponent';
import colors from '../colors/colors';
import globalStyle from '../assets/styles/globalStyle';
import {useEvent} from '../components/context/EventContext';
import axios from 'axios';
import Share from 'react-native-share';

const MoreScreen = ({route, navigation}) => {
  const {triggerListRefresh} = useEvent();

  const {
    eventId,
    attendeeId,
    firstName,
    lastName,
    email,
    phone,
    organization,
    attendeeStatus,
  } = route.params;
  console.log(firstName, lastName, email, attendeeStatus, organization);
  const [localAttendeeStatus, setLocalAttendeeStatus] =
    useState(attendeeStatus);

  const {itemName} = route.params || {};
  const handleBackPress = () => {
    // Define what happens when back is pressed. For example:
    navigation.goBack(); // This uses React Navigation's goBack function
  };
  const handleBadgePress = () => {
    // Define what happens when back is pressed. For example:
    navigation.navigate('Badge', {
      attendeeId: attendeeId,
      eventId: eventId,
    });
  };

  const handleButton = async newStatus => {
    const updatedStatus = attendeeStatus == 0 ? 1 : 0;

    // API endpoint for updating attendee status
    const url = `https://ems.choyou.fr/event_api/update_event_attendee_attendee_status/?event_id=${eventId}&attendee_id=${attendeeId}&attendee_status=${updatedStatus}`;
    console.log(eventId, attendeeId);
    triggerListRefresh();
    try {
      // Example of a POST request to update the attendee status
      // You might need to adjust headers or the request format based on your API's specifications
      const response = await axios.post(url);

      // Check if the update was successful
      if (response.data.status) {
        setLocalAttendeeStatus(updatedStatus);
        console.log(
          'Attendee status updated successfully:',
          response.data.message,
        );
      } else {
        console.error(
          'Failed to update attendee status:',
          response.data.message,
        );
      }
    } catch (error) {
      console.error('Error updating attendee status:', error);
    }
  };
  const pdf = `https://ems.choyou.fr/uploads/badges/${eventId}/pdf/${attendeeId}.pdf`;
  const sendPdf = async () => {
    try {
      const shareResponse = await Share.open({
        url: pdf,
        type: 'application/pdf',
      });
      console.log(shareResponse);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderComponent
        title={'Profil'}
        handlePress={handleBackPress}
        color={colors.darkGrey}
      />
      <View style={globalStyle.container}>
        <MoreComponent
          See={handleBadgePress}
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          organization={organization}
          attendeeStatus={localAttendeeStatus}
          handleButton={handleButton}
          Share={sendPdf}
        />
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
