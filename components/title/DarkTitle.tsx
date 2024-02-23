import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../chemin/vers/votre/fichier/colors'; // Assurez-vous d'ajuster le chemin

const LightTitle = ({ title }) => {
  return <Text style={styles.lightTitle}>{title}</Text>;
};

const styles = StyleSheet.create({
  lightTitle: {
    fontSize: 20,
    color: 'black', // Couleur du texte pour un arrière-plan clair
    fontWeight: 'bold',
  },
});

export default LightTitle;