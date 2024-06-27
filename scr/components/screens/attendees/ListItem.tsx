import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../colors/colors';
import CustomSwitch from '../../elements/Switch';
import axios from 'axios';
import {useEvent} from '../../../context/EventContext';
import { BASE_URL } from '../../../config/config';

const ListItem = React.memo(({item, searchQuery, onUpdateAttendee}) => {
  const navigation = useNavigation();
  const {triggerListRefresh} = useEvent();

  const initialSwitchState = item.attendee_status == 1;
  const [isSwitchOn, setIsSwitchOn] = React.useState(initialSwitchState);

  const handleSwitchToggle = async newValue => {
    setIsSwitchOn(newValue);
    const newAttendeeStatus = newValue ? 1 : 0;

    const updatedAttendee = {
      ...item,
      attendee_status: newAttendeeStatus,
    };

    try {
      await onUpdateAttendee(updatedAttendee); // Call the update function passed from List
      triggerListRefresh(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating attendee status:', error);
    }
  };

  const highlightSearch = (text, query) => {
    if (!query.trim()) {
      return <Text style={{color: 'black'}}>{text}</Text>;
    }

    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);

    return parts
      .filter(part => part)
      .map((part, index) =>
        regex.test(part) ? (
          <Text key={index} style={{color: colors.green, fontWeight: 'bold'}}>
            {part}
          </Text>
        ) : (
          <Text key={index} style={{color: 'black'}}>
            {part}
          </Text>
        ),
      );
  };

  const handleItemPress = () => {
    navigation.navigate('More', {
      attendeeId: item.id,
      eventId: item.event_id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      phone: item.phone,
      attendeeStatus: item.attendee_status,
      jobTitle: item.designation,
      organization: item.organization,
    });
  };

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <View style={styles.listItemContainer}>
        <Text style={styles.itemName}>
          {highlightSearch(`${item.first_name} ${item.last_name}`, searchQuery)}
        </Text>
        <CustomSwitch value={isSwitchOn} onValueChange={handleSwitchToggle} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyCream,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
});

export default ListItem;
