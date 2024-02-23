import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../colors/colors';

const HeaderComponent = ({title, handlePress, color}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.backButton}>
        <Image
          source={require('../../assets/images/icons/Retour.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      {/* Title is absolutely positioned to ensure it's centered */}
      <Text style={[styles.title, {color}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items to start
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    position: 'relative',
    height: 60,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute', // Position title absolutely to center it
    left: 0,
    right: 0,
    textAlign: 'center', // Ensure text is centered
  },
  backButton: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonImage: {
    width: 15,
    height: 20,
    tintColor: colors.green,
  },
});

export default HeaderComponent;
