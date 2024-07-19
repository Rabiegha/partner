import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import colors from '../../../../colors/colors';
import Retour from '../../../assets/images/icons/Retour.png';
import Filtre from '../../../assets/images/icons/Filtre.png';

const HeaderParticipants = ({onLeftPress, Title, onRightPress}) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={onLeftPress} style={styles.backButton}>
        <Image source={Retour} style={styles.buttonImage} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.Title}>{Title}</Text>
      </View>
      <View style={styles.rightButtonContainer}>
        {/*       <TouchableOpacity onPress={onRightPress} style={styles.backButton}>
          <Image source={Filtre} style={styles.buttonImageBlack} />
        </TouchableOpacity> */}
      </View>
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
    maxHeight: 60,
    height: 60,
    zIndex: 10,
    position: 'relative',
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  rightButtonContainer: {
    width: 40,
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
