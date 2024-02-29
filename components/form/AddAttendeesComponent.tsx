import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import SuccessComponent from '../notification/SuccessComponent';
import FailComponent from '../notification/FailComponent';
import {useFocusEffect} from '@react-navigation/native'; // import de useFocusEffect

const AddAttendeesComponent = ({onPress}) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [numeroTelephone, setNumeroTelephone] = useState('');
  const [societe, setSociete] = useState('');
  const [success, setSuccess] = useState(null); // Null au départ

  const handleEnregistrer = () => {
    // Logique pour traiter les données du formulaire
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Email:', email);
    console.log('Numéro de téléphone:', numeroTelephone);
    console.log('Société:', societe);

    // Simulons le succès ou l'échec de l'enregistrement ici
    const enregistrementReussi = false; // Mettez à false pour simuler un échec

    if (enregistrementReussi) {
      setSuccess(true); // Enregistrement réussi
    } else {
      setSuccess(false); // Enregistrement échoué
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Réinitialiser isVisible à false lorsque l'écran est défocus
      return () => setSuccess(null);
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <TextInput
        style={globalStyle.input}
        placeholder="Nom"
        value={nom}
        onChangeText={text => setNom(text)}
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={text => setPrenom(text)}
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Numéro de téléphone"
        value={numeroTelephone}
        onChangeText={text => setNumeroTelephone(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Société"
        value={societe}
        onChangeText={text => setSociete(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexGrow: 1,
    padding: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#77CB8F',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddAttendeesComponent;
