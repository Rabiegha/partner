import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../colors/colors';
import retourIcon from '../../../assets/images/icons/Retour.png';

const HeaderComponent = ({title, handlePress, color, backgroundColor}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.headerContainer, {backgroundColor: backgroundColor}]}>
      <TouchableOpacity onPress={handlePress} style={styles.backButton}>
        <Image source={retourIcon} style={styles.buttonImage} />
      </TouchableOpacity>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: Platform.OS === 'ios' ? 50 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 12,
    position: 'relative',
    maxHeight: 60,
    height: 60,
    zIndex: 10,
  },
  title: {
    top: 25,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  backButton: {
    justifyContent: 'center',
    padding: 10,
    zIndex: 10,
  },
  buttonImage: {
    width: 15,
    height: 23,
    tintColor: colors.green,
  },
});

export default HeaderComponent;
