// ItemText.js
import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import LargeButton from '../button/LargeButton';
import colors from '../../colors/colors';
import SmallButton from '../button/SmallButton';

const BadgeComponent = ({children}) => {
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
          imageSource={require('../../assets/images/icons/Partager.png')}
          onPress={undefined}
          backgroundColor={colors.greyCream}
          tintColor={colors.darkGrey}
        />
        <SmallButton
          imageSource={require('../../assets/images/icons/Partager.png')}
          onPress={undefined}
          backgroundColor={colors.greyCream}
          tintColor={colors.darkGrey}
        />
        <SmallButton
          imageSource={require('../../assets/images/icons/Partager.png')}
          onPress={undefined}
          backgroundColor={colors.greyCream}
          tintColor={colors.darkGrey}
        />
      </View>
      <LargeButton
        title="Action 1"
        onPress={''}
        backgroundColor={colors.green}
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
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 380,
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

export default BadgeComponent;
