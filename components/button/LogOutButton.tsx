// CustomButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../../colors/colors';
import {Image} from 'react-native';

const LogOutButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require('../../assets/images/icons/Log-out.png')}
        resizeMode="contain"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 17,
          height: 17,
          tintColor: colors.red,
          marginRight: 10,
        }}
      />
      <Text style={styles.buttonText}>Log out</Text>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: colors.red,
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.red,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LogOutButton;
