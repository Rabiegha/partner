import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProgressText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>9/14</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProgressText;
