// ItemText.js
import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import LabelValueComponent from '../elements/LabelValueComponent';
import LargeButton from '../elements/buttons/LargeButton';
import colors from '../../colors/colors';
import SmallButton from '../elements/buttons/SmallButton';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const firstName = storage.getString('first_name');
    const lastName = storage.getString('last_name');

    if (firstName && lastName) {
      setUserDetails({ firstName, lastName });
    }
  }, []);

  return userDetails;
};

const ProfileComponent = () => {
  const { firstName, lastName } = useUserDetails();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.topButtonsContainer} />
      <LabelValueComponent
        label="Prenom:"
        value={firstName}
        value2={undefined}
      />
      <LabelValueComponent label="Nom:" value={firstName} value2={undefined} />
      <LabelValueComponent
        label="Adresse mail:"
        value={lastName}
        value2={undefined}
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
    width: 180,
    height: 180,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 35,
  },
});

export default ProfileComponent;
