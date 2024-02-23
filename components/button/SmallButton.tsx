// CustomButton.js
import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import colors from '../../colors/colors';

const SmallButton = ({
  imageSource,
  pressHandler,
  backgroundColor,
  tintColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {tintColor}, {backgroundColor}]}
      onPress={pressHandler}>
      {imageSource && (
        <Image source={imageSource} style={[styles.image, {tintColor}]} />
      )}
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginHorizontal: 20,
    height: 40,
    marginBottom: 10,
  },
  image: {
    width: 25,
    height: 25,
  },
});

export default SmallButton;
