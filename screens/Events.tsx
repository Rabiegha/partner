import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import globalStyle from '../assets/styles/globalStyle';
import ConnexionComponent from '../components/connexion/ConnexionComponent';

const EventsScreen = () => {
  return (
    <View style={[globalStyle.backgroundWhite, styles.container]}>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <ConnexionComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventsScreen;
