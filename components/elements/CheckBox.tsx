import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CheckBox} from 'react-native-elements';
import colors from '../../colors/colors';

const CheckBoxComponent = ({key, isChecked, onPress, title}) => {
  return (
    <CheckBox
      key={key}
      title={title}
      checked={isChecked}
      checkedIcon={
        <Image
          source={require('../../assets/images/icons/Checked.png')}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: colors.greyCream,
          }}
        />
      }
      onPress={onPress}
    />
  );
};

export default CheckBoxComponent;
