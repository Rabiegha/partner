// LabelValueComponent.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'; // Assuming you're using Expo for icons
import colors from '../../colors/colors';

const LabelValueComponent = ({label, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Image
          source={require('../../assets/images/icons/Modifier.png')}
          resizeMode="contain"
          style={{
            width: 32,
            height: 32,
            tintColor: colors.darkGrey,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
  },
  editButton: {
    marginLeft: 10,
  },
});

export default LabelValueComponent;
