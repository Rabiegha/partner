import React, {useState} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import LargeButton from '../elements/buttons/LargeButton';
import colors from '../../colors/colors';
import SmallButton from '../elements/buttons/SmallButton';

const BadgeComponent = ({imageUri, share, download, print}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageLoaded ? (
          <Image
            source={{uri: imageUri}}
            style={styles.image}
            onError={() => setImageLoaded(false)}
          />
        ) : (
          <Text style={styles.imageNotFound}>Le badge n'existe pas</Text>
        )}
      </View>
      {imageLoaded && (
        <View style={styles.buttonsContainer}>
          <View style={styles.topButtonsContainer}>
            <SmallButton
              imageSource={require('../../assets/images/icons/Download.png')}
              pressHandler={download}
              backgroundColor={colors.greyCream}
              tintColor={colors.darkGrey}
            />
            <SmallButton
              imageSource={require('../../assets/images/icons/Print.png')}
              pressHandler={print}
              backgroundColor={colors.greyCream}
              tintColor={colors.darkGrey}
            />
          </View>
          <LargeButton
            title="Envoyer"
            onPress={share}
            backgroundColor={colors.green}
          />
        </View>
      )}
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
  imageNotFound: {
    fontSize: 18,
    color: colors.darkGrey,
    textAlign: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
});

export default BadgeComponent;
