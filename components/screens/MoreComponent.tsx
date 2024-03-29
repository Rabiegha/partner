// ItemText.js
import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import LabelValueComponent from '../elements/LabelValueComponent';
import LargeButton from '../elements/buttons/LargeButton';
import colors from '../../colors/colors';
import SmallButton from '../elements/buttons/SmallButton';

const MoreComponent = ({
  firstName,
  lastName,
  email,
  phone,
  attendeeStatus,
  organization,
  See,
  handleButton,
  Share,
}) => {
  console.log(firstName, lastName, email);
  function insertSpaceBetweenPairs(str) {
    if (str == null) {
      return '';
    }

    let removePlus = false;

    // Vérifier si le premier caractère est un "+" suivi d'un "0" et le supprimer le cas échéant
    if (str.startsWith('+0')) {
      str = str.slice(1);
      removePlus = true;
    }

    // Si le "+" a été supprimé, formater différemment
    if (removePlus) {
      // Insérer un espace entre chaque paire de caractères dans toute la chaîne
      return str.match(/.{1,2}/g)?.join(' ') || '';
    } else {
      // Sinon, diviser la chaîne en trois premiers caractères, le quatrième caractère, et le reste
      var firstThreeChars = str.slice(0, 3);
      var fourthChar = str.slice(3, 4);
      var restOfChars = str.slice(4);

      // Insérer un espace entre chaque paire de caractères pour le reste de la chaîne
      var stringWithSpaces = restOfChars.match(/.{1,2}/g)?.join(' ') || '';

      // Rejoindre les trois premiers caractères, le quatrième caractère avec le reste de la chaîne avec des espaces
      return firstThreeChars + ' ' + fourthChar + ' ' + stringWithSpaces;
    }
  }

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
          pressHandler={See}
          backgroundColor={colors.green}
          tintColor={colors.greyCream}
        />
{/*         <SmallButton
          imageSource={require('../../assets/images/icons/Partager.png')}
          pressHandler={Share}
          backgroundColor={colors.greyCream}
          tintColor={colors.darkGrey}
        /> */}
        <SmallButton
          imageSource={require('../../assets/images/icons/Supp.png')}
          pressHandler={Share}
          backgroundColor={colors.red}
          tintColor="white"
        />
      </View>
      <LabelValueComponent label="Nom:" value={firstName} value2={lastName} />
      <LabelValueComponent
        label="Adresse mail:"
        value={email}
        value2={undefined}
      />
      <LabelValueComponent
        label="Téléphone:"
        value={insertSpaceBetweenPairs(phone)}
        value2={undefined}
      />
      <LabelValueComponent
        label="Entreprise:"
        value={organization}
        value2={undefined}
      />
      {attendeeStatus == 0 ? (
        <LargeButton
          title="Check-in"
          onPress={() => handleButton(1)} // Pass 1 to indicate check-in
          backgroundColor={colors.green}
        />
      ) : (
        <LargeButton
          title="Undo Check-in"
          onPress={() => handleButton(0)} // Pass 0 to indicate undo check-in
          backgroundColor={colors.red}
        />
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
    marginBottom: 35,
  },
});

export default MoreComponent;
