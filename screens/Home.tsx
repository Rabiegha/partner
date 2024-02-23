import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import globalStyle from '../assets/styles/globalStyle';

const HomeScreen = ({navigation}) => {
  const navigateToMainScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Tabs'}],
    });
  };
  return (
    <View style={globalStyle.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button
        title="Go to Attendees"
        onPress={navigateToMainScreen} // Use the name of your Attendees screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default HomeScreen;
