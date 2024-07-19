import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Image,
  Button,
} from 'react-native';
import ListItem from './ListItem';
import axios from 'axios';
import {useEvent} from '../../../context/EventContext';
import colors from '../../../../colors/colors';
import {BASE_URL} from '../../../config/config';
import useUserId from '../../../hooks/useUserId';
import {Attendee} from '../../../interfaces/interfaces.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {demoEvents} from '../../../demo/demoEvents';
import {AuthContext} from '../../../context/AuthContext.tsx';
import emptyIcon from '../../../assets/images/empty.gif';

import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const List = ({searchQuery, onUpdateProgress, filterCriteria}) => {
  const [openSwipeable, setOpenSwipeable] = useState(null);
  const handleSwipeableOpen = (id, swipeableRef) => {
    if (openSwipeable && openSwipeable.id !== id) {
      openSwipeable.current.close();
    }
    setOpenSwipeable({id, ref: swipeableRef});
  };

  const handleSwipeableClose = (id) => {
    if (openSwipeable && openSwipeable.id === id) {
      setOpenSwipeable(null);
    }
  };

  const [filteredData, setFilteredData] = useState([]);
  const [allAttendees, setAllAttendees] = useState([]);
  const flatListRef = useRef(null);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalCheckedAttendees, setTotalCheckedAttendees] = useState(0);
  const {refreshList, triggerListRefresh, updateAttendee, attendeesRefreshKey} =
    useEvent();
  const {eventId} = useEvent();
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useUserId();
  const {isDemoMode} = useContext(AuthContext);
  useEffect(() => {
    console.log('eventId', eventId);
  });
  /*   console.log(isDemoMode); */

  const expirationTimeInMillis = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

  const storeData = async (key, value) => {
    try {
      const timestampedData = {
        data: value,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(timestampedData));
      console.log(`Stored data for key: ${key}`);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

  const getData = async (key, expirationTimeInMillis) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        const currentTime = Date.now();
        if (currentTime - parsedData.timestamp < expirationTimeInMillis) {
          console.log(`Data for key: ${key} is up-to-date`);
          return parsedData.data;
        } else {
          await AsyncStorage.removeItem(key);
          console.log(`Data for key: ${key} expired and removed`);
        }
      }
    } catch (e) {
      console.error('Error retrieving data', e);
    }
    return null;
  };

  const clearLocalData = async () => {
    try {
      await AsyncStorage.removeItem(`attendees_${eventId}`);
      setFilteredData([]);
      setAllAttendees([]);
      setTotalAttendees(0);
      setTotalCheckedAttendees(0);
      setHasData(false);
      triggerListRefresh();
    } catch (e) {
      console.error('Error clearing local data', e);
    }
  };

  const fetchAllEventAttendeeDetails = async () => {
    setIsLoading(true);
    try {
      let attendees = await getData(
        `attendees_${eventId}`,
        expirationTimeInMillis,
      );
      if (!attendees) {
        if (isDemoMode) {
          const selectedEvent = demoEvents.find(
            event => event.event_id === eventId,
          );
          if (selectedEvent) {
            attendees = selectedEvent.participants;
            await storeData(`attendees_${eventId}`, attendees);
          }
        } else {
          const urlNotCheckedIn = `${BASE_URL}/ajax_get_event_attendee_details/?event_id=${eventId}&current_user_login_details_id=${userId}&attendee_status=0&status_id=`;

          try {
            const responseNotCheckedIn = await axios.get(urlNotCheckedIn);

            attendees = [];
            if (responseNotCheckedIn.data.status) {
              attendees = responseNotCheckedIn.data.event_attendee_details;
            }
            await storeData(`attendees_${eventId}`, attendees);
          } catch (error) {
            console.error(
              'Error fetching data from server, using local data:',
              error,
            );
          }
        }
      }

      // Stocker toutes les données des participants pour les calculs globaux
      setAllAttendees(attendees || []);
      setTotalAttendees(attendees ? attendees.length : 0);
      setTotalCheckedAttendees(
        attendees ? attendees.filter(a => a.attendee_status == 1).length : 0,
      );

      // Appliquez les filtres basés sur filterCriteria ici
      let filteredAttendees = attendees || [];
      if (filterCriteria.status === 'checked-in') {
        filteredAttendees = filteredAttendees.filter(
          attendee => attendee.attendee_status == 1,
        );
      } else if (filterCriteria.status === 'not-checked-in') {
        filteredAttendees = filteredAttendees.filter(
          attendee => attendee.attendee_status == 0,
        );
      }

      // Triez les participants pour que ceux avec attendee_status = 0 soient en haut
      filteredAttendees.sort((a, b) => a.attendee_status - b.attendee_status);

      // Filtrez davantage par searchQuery si fourni
      filteredAttendees = filteredAttendees.filter(attendee =>
        `${attendee.first_name} ${attendee.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );

      setFilteredData(filteredAttendees);
      setHasData(filteredAttendees.length > 0);
      /*       console.log('Filtered attendees data:', filteredAttendees); */
    } catch (error) {
      console.error('Error fetching attendee details:', error);
      setHasData(false);
    } finally {
      setIsLoading(false);
    }
  };

  // clearLocalData
  useFocusEffect(
    useCallback(() => {
      clearLocalData();

      return () => {
        // Any cleanup can be done here
      };
    }, [eventId]),
  );

  useEffect(() => {
    fetchAllEventAttendeeDetails();
  }, [
    eventId,
    searchQuery,
    refreshList,
    filterCriteria,
    isDemoMode,
    attendeesRefreshKey,
  ]);

  useEffect(() => {
    const ratio =
      totalAttendees > 0 ? (totalCheckedAttendees / totalAttendees) * 100 : 0;
    onUpdateProgress(totalAttendees, totalCheckedAttendees, ratio);
    clearLocalData;
  }, [totalAttendees, totalCheckedAttendees, onUpdateProgress]);

  const handleUpdateAttendee = async updatedAttendee => {
    try {
      // Mettre à jour l'attendee localement
      const updatedAttendees = allAttendees.map(attendee =>
        attendee.id === updatedAttendee.id ? updatedAttendee : attendee,
      );
      setAllAttendees(updatedAttendees);
      await storeData(`attendees_${eventId}`, updatedAttendees);

      // Mettre à jour l'attendee sur le serveur
      const url = `${BASE_URL}/update_event_attendee_attendee_status/?event_id=${updatedAttendee.event_id}&attendee_id=${updatedAttendee.id}&attendee_status=${updatedAttendee.attendee_status}`;
      await axios.post(url);

      // Rafraîchir les données affichées
      triggerListRefresh();
    } catch (error) {
      console.error('Error updating attendee', error);
    }
  };

  return (
    <View style={styles.list}>
      {/*       <Button title="Clear Local Data" onPress={clearLocalData} /> */}
      {isLoading ? (
        <ActivityIndicator color={colors.green} size="large" />
      ) : hasData ? (
        <FlatList
          ref={flatListRef}
          contentContainerStyle={styles.contentContainer}
          data={filteredData}
          keyExtractor={item => `${item.id}_${item.attendee_status}`}
          renderItem={({item}) => (
            <ListItem
              item={item}
              searchQuery={searchQuery}
              onUpdateAttendee={handleUpdateAttendee} // Pass the update function to ListItem
              onSwipeableOpen={handleSwipeableOpen}
              onSwipeableClose={handleSwipeableClose}
              isActive={openSwipeable ? openSwipeable.id === item.id : false}
            />
          )}
        />
      ) : (
        <View style={styles.noDataView}>
          <FastImage source={emptyIcon} style={styles.gifStyle} />
          {/*           <Image source={emptyIcon} style={styles.gifStyle} /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: 600,
  },
  contentContainer: {
    paddingBottom: 300,
  },
  gifStyle: {
    height: 300,
    width: 300,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default List;
