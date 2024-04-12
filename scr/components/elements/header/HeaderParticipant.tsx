import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import colors from '../../../../colors/colors';

const HeaderParticipants = ({onLeftPress, Title, onRightPress}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onLeftPress} style={styles.backButton}>
        <Image
          source={require('../../../assets/images/icons/Retour.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <Text style={styles.Title}>{Title}</Text>
      <TouchableOpacity onPress={onRightPress} style={styles.backButton}>
        <Image
          source={require('../../../assets/images/icons/Filtre.png')}
          style={styles.buttonImageBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to start
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    position: 'relative',
    maxHeight: 60,
    height: 60,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
  },
  Title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    maxWidth: 200,
  },
  buttonImage: {
    width: 15,
    height: 23,
    tintColor: colors.green,
    zIndex: 2,
  },
  buttonImageBlack: {
    tintColor: colors.darkGrey,
    width: 20,
    height: 20,
  },
});

export default HeaderParticipants;
