import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CheckBox} from 'react-native-elements';
import colors from '../../colors/colors';

const FiltreDetailsComponent = ({sections: initialSections}) => {
  const [sections, setSections] = useState(initialSections);

  const handleCheckboxPress = (sectionIndex, buttonIndex) => {
    const newSections = sections.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        return {
          ...section,
          buttons: section.buttons.map((button, bIndex) => {
            if (bIndex === buttonIndex) {
              return {...button, checked: !button.checked};
            }
            return button;
          }),
        };
      }
      return section;
    });

    setSections(newSections);
  };

  // Render component with updated onPress
  return (
    <View>
      {sections.map((section, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.title}>{section.title}</Text>
          {section.buttons.map((button, buttonIndex) => (
            <CheckBox
              key={buttonIndex}
              title={button.title}
              checkedIcon={
                <Image
                  source={require('../../assets/images/icons/Checked.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.greyCream,
                  }}
                />
              }
              uncheckedIcon={
                <Image
                  source={require('../../assets/images/icons/Not-checked.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.greyCream,
                  }}
                />
              }
              checked={button.checked}
              onPress={() => handleCheckboxPress(index, buttonIndex)}
              containerStyle={styles.button}
              textStyle={styles.buttonText}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.darkerGrey,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.greyCream,
  },
  button: {
    backgroundColor: 'transparent', // Remove container background
    borderWidth: 0, // Remove container border
    padding: 0, // Adjust padding as needed
    marginLeft: 0, // Adjust margin to align with your design
    marginRight: 0,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    color: colors.greyCream,
    fontWeight: '300',
  },
});

export default FiltreDetailsComponent;
