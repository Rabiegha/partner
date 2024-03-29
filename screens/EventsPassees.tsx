import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, StatusBar} from 'react-native';
import axios from 'axios'; // Assurez-vous d'importer axios
import ListEvents from '../components/screens/events/ListEvents';
import globalStyle from '../assets/styles/globalStyle';
import {useEvent} from '../components/context/EventContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Assurez-vous que `current_user_login_details_id` est disponible
const current_user_login_details_id = '91';

const EventPasseesScreen = ({searchQuery, onEventSelect}) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content'); // Set status bar style to light-content
      return () => {
        StatusBar.setBarStyle('dark-content'); // Reset status bar style when screen loses focus
      };
    }, []),
  );
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const url = `https://ems.choyou.fr/event_api/ajax_get_event_details/?user_id=${current_user_login_details_id}&is_event_from=0`;
        const response = await axios.get(url);
        if (response.data.status) {
          setEventDetails(response.data.event_details);
        } else {
          console.error('Failed to fetch event details');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEventDetails();
  }, []);

  const filteredEvents = eventDetails.filter(event =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSelectEvent = event => {
    onEventSelect(event); // Utilisez le callback pour passer les données de l'événement
  };

  return (
    <View style={[styles.container, globalStyle.backgroundWhite]}>
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.event_id.toString()}
        renderItem={({item}) => {
          return (
            <ListEvents
              eventData={{
                event_name: item.event_name,
                ems_secret_code: item.ems_secret_code.toString(),
                event_id: item.event_id,
              }} // Pass the event name directly as a prop
              searchQuery={searchQuery}
              onPress={handleSelectEvent}
              eventDate={item.nice_start_datetime}
              eventType={item.event_type_name}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 2,
  },
  // Autres styles si nécessaire
});

export default EventPasseesScreen;
