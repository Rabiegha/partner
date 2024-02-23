import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../chemin/vers/votre/fichier/colors'; // Assurez-vous d'ajuster le chemin

const DarkTitle = ({ title }) => {
  return <Text style={styles.darkTitle}>{title}</Text>;
};

const styles = StyleSheet.create({
  darkTitle: {
    fontSize: 20,
    color: 'white', // Couleur du texte pour un arrière-plan sombre
    fontWeight: 'bold',
  },
});

export default DarkTitle;