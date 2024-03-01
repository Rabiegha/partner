import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../colors/colors'; // Assuming this path is correct

const ListEvents = ({
  eventName,
  searchQuery,
  onPress,
  eventDate,
  eventType,
}) => {
  const navigation = useNavigation();

  const highlightSearch = (text, query) => {
    if (!text) {
      return null; // or any default value you want to return when text is undefined
    }

    if (!query) {
      return <Text style={{color: 'black'}}>{text}</Text>;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={{color: colors.green}}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={{color: 'black'}}>
          {part}
        </Text>
      ),
    );
  };

  const handlePress = () => {
    // Check if onPress is defined before calling it
    if (typeof onPress === 'function') {
      onPress(eventName);
    } else {
      console.warn('onPress is not a function or is not defined');
    }
  };

  return (
    <TouchableOpacity style={styles.listItem} onPress={handlePress}>
      <View style={styles.listItemContainer}>
        <View style={styles.dateLieu}>
          <Text style={styles.dateLieuText}>{eventDate}</Text>
          <Text style={styles.dateLieuText}>{eventType}</Text>
        </View>
        <Text style={styles.itemName}>
          {highlightSearch(eventName, searchQuery)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyCream,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 10,
    height: 100,
  },
  dateLieu: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRightWidth: 0.5,
    paddingRight: 17,
    borderRightColor: colors.grey,
    maxWidth: 150,
  },
  dateLieuText: {
    textAlign: 'right',
    color: colors.grey,
    fontSize: 18,
  },
  lieu: {
    textAlign: 'right',
    color: colors.grey,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 16,
    color: colors.darkerGrey,
    fontWeight: 'bold',
    paddingLeft: 17,
    flex: 1,
  },
});

export default ListEvents;
