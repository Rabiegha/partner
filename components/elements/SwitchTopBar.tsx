import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Button, Text} from 'react-native';
import ListEvents from './ListEvents'; // Adjust the path as needed
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../colors/colors';

const SwitchTopBar = ({
  color1,
  color2,
  isSectionOneVisible,
  toAvenirSections,
  toPasseesSections,
}) => {
  const avenirColor = isSectionOneVisible ? colors.green : colors.grey;
  const passeColor = isSectionOneVisible ? colors.grey : colors.green;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toAvenirSections()}>
        <Text style={[styles.text, {color: avenirColor}]}>A venir</Text>
        <View style={[styles.bar, {backgroundColor: avenirColor}]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toPasseesSections()}>
        <Text style={[styles.text, {color: passeColor}]}>Passées</Text>
        <View style={[styles.bar, {backgroundColor: passeColor}]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 17,
    paddingHorizontal: 10,
  },
  section: {
    padding: 20,
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  bar: {
    marginTop: 5,
    height: 15,
    width: 140,
    borderRadius: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwitchTopBar;
