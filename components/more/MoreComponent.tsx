// ItemText.js
import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import LabelValueComponent from './LabelValueComponent';
import LargeButton from '../button/LargeButton';
import colors from '../../colors/colors';
import SmallButton from '../button/SmallButton';
import {useNavigation} from '@react-navigation/native';

const MoreComponent = ({children, pressHandle}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.topButtonsContainer}>
        <SmallButton
          imageSource={require('../../assets/images/icons/Scan.png')}
          pressHandler={pressHandle}
          backgroundColor={colors.green}
          tintColor={colors.greyCream}
        />
        <SmallButton
          imageSource={require('../../assets/images/icons/Partager.png')}
          pressHandler={undefined}
          backgroundColor={colors.greyCream}
          tintColor={colors.darkGrey}
        />
      </View>
      <LabelValueComponent label="Nom:" value={children} />
      <LabelValueComponent
        label="Adresse mail:"
        value="cem.koseoglu@salesforce.com"
      />
      <LabelValueComponent label="Téléphone:" value="06 06 06 06 06" />
      <LabelValueComponent label="Heure d’enregistrement:" value="15:36" />
      <LargeButton
        title="Check-in"
        onPress={''}
        backgroundColor={colors.green}
      />
      <LargeButton
        title="Undo Check-in"
        onPress={''}
        backgroundColor={colors.red}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 30,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoreComponent;
