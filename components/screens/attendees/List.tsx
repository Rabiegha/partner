import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {useEvent} from '../../context/EventContext';
import ProgressBar from '../../elements/progress/ProgressBar';

const List = ({searchQuery, onUpdateProgress}) => {
  const [filteredData, setFilteredData] = useState([]);
  const {refreshList} = useEvent();
  const flatListRef = useRef(null);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalCheckedAttendees, setTotalCheckedAttendees] = useState(0);
  const {eventId} = useEvent();
  console.log('eventId', eventId);

  // Callback function to handle switch toggle in ListItem
  const handleSwitchToggle = () => {
    // Update your data here based on the itemId and newValue
    // For now, just log the values
  };

  useEffect(() => {
    const fetchAllEventAttendeeDetails = async () => {
      try {
        const url = `https://ems.choyou.fr/event_api/ajax_get_event_attendee_details/?event_id=${eventId}&attendee_id=91&status_id=2`;
        const response = await axios.get(url);
        const url2 = `https://ems.choyou.fr/event_api/ajax_get_event_attendee_details/?event_id=${eventId}&attendee_id=91&status_id=2`;
        const response2 = await axios.get(url2);
        const url3 = `https://ems.choyou.fr/event_api/ajax_get_event_attendee_details/?event_id=${eventId}&attendee_id=91&status_id=2&attendee_status=1`;
        const response3 = await axios.get(url3);

        if (
          response.data.status &&
          Array.isArray(response.data.event_attendee_details)
        ) {
          // Filtrer et trier les données
          let data = response.data.event_attendee_details.filter(item =>
            `${item.first_name} ${item.last_name}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          );
          let data2 = response2.data.event_attendee_details;
          let data3 = response3.data.event_attendee_details;
          // Trier les attendees selon leur statut de check-in
          data.sort((a, b) => {
            if (a.attendee_status == 0 && b.attendee_status == 1) {
              return -1;
            }
            if (a.attendee_status == 1 && b.attendee_status == 0) {
              return 1;
            }
            return 0;
          });

          setFilteredData(data);

          setTotalCheckedAttendees(data3.length);

          //total attendee
          setTotalAttendees(data2.length);
        } else {
          console.error(
            'Les données des participants ne sont pas disponibles ou la structure de la réponse est inattendue',
          );
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des détails des participants:',
          error,
        );
      }
    };
    const ratio =
      totalAttendees > 0 ? (totalCheckedAttendees / totalAttendees) * 100 : 0;

    console.log(totalAttendees, totalCheckedAttendees, ratio);
    onUpdateProgress(totalAttendees, totalCheckedAttendees, ratio);

    fetchAllEventAttendeeDetails();
  }, [searchQuery, refreshList, totalAttendees, totalCheckedAttendees]);

  // Calculate the ratio of checked-in attendees to the total number of attendees

  return (
    <FlatList
      ref={flatListRef}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={filteredData}
      keyExtractor={item => `${item.id}_${item.attendee_status}`}
      renderItem={({item}) => (
        <ListItem
          item={item}
          searchQuery={searchQuery}
          onSwitchToggle={handleSwitchToggle} // Pass the callback function
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    height: 600,
  },
  contentContainer: {
    paddingBottom: 200, // Adjust this value based on the height of your bottom tab bar
  },
});

export default List;
