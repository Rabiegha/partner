import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import SuccessComponent from '../elements/notifications/SuccessComponent';
import FailComponent from '../elements/notifications/FailComponent';
import colors from '../../../colors/colors';
import {useFocusEffect} from '@react-navigation/native';

const EditAttendeesComponent = ({
  onPress,
  setNom,
  setPrenom,
  setEmail,
  setNumeroTelephone,
  setSociete,
  setJobTitle,
  setSuccess,
  setComment,
  nom,
  prenom,
  email,
  numeroTelephone,
  societe,
  jobTitle,
  comment,
  success,
  inputErrors,
  resetInputError,
}) => {
  // Helper function to limit phone number to 9 digits
  const handlePhoneNumberChange = text => {
    // Remove the '+' character if the text starts with '+0'
    if (text != null && text.startsWith('+0')) {
      text = text.slice(1); // Remove the '+' character, keep the '0'
    }
    // Limit to 9 digits
    if (text != null && text.length <= 9) {
      setNumeroTelephone(text);
      resetInputError('numeroTelephone');
    }
    return text;
  };

  useFocusEffect(
    React.useCallback(() => {
      handlePhoneNumberChange(numeroTelephone);
      return () => {};
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.textNom}>Nom</Text>
        <TextInput
          style={[
            globalStyle.input,
            {color: colors.lightGrey},
            inputErrors.nom && {
              backgroundColor: colors.lightRed,
              borderColor: colors.red,
            },
          ]}
          placeholderTextColor={inputErrors.nom ? colors.red : colors.grey}
          value={nom}
          onChangeText={text => {
            setNom(text);
            resetInputError('nom');
          }}
          editable={false}
        />
        <Text style={[styles.error, {opacity: 0}]}>Champ requis</Text>
        <Text style={styles.text}>Prénom</Text>
        <TextInput
          style={[
            globalStyle.input,
            {color: colors.lightGrey},
            inputErrors.prenom && {
              backgroundColor: colors.lightRed,
              borderColor: colors.red,
            },
          ]}
          placeholderTextColor={inputErrors.prenom ? colors.red : colors.grey}
          value={prenom}
          onChangeText={text => {
            setPrenom(text);
            resetInputError('prenom');
          }}
          editable={false}
        />
        <Text style={[styles.error, {opacity: 0}]}>Champ requis</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={[
            globalStyle.input,
            inputErrors.email && {
              backgroundColor: colors.lightRed,
              borderColor: colors.red,
            },
          ]}
          placeholderTextColor={inputErrors.email ? colors.red : colors.grey}
          value={email}
          onChangeText={text => {
            setEmail(text);
            resetInputError('email');
          }}
          keyboardType="email-address"
        />
        <Text style={[styles.error, {opacity: inputErrors.email ? 1 : 0}]}>
          Veuillez entrer une adresse email valide *
        </Text>
        <Text style={styles.text}>Téléphone</Text>
        <TextInput
          style={[
            globalStyle.input,
            inputErrors.numeroTelephone && {
              backgroundColor: colors.lightRed,
              borderColor: colors.red,
            },
          ]}
          placeholderTextColor={
            inputErrors.numeroTelephone ? colors.red : colors.grey
          }
          value={numeroTelephone}
          onChangeText={text => {
            setNumeroTelephone(text);
          }}
          keyboardType="numeric"
        />
        <Text
          style={[
            styles.error,
            {opacity: inputErrors.numeroTelephone ? 1 : 0},
          ]}>
          Veuillez entrer un numéro de téléphone valide *
        </Text>
        <Text style={styles.text}>Société</Text>
        <TextInput
          style={globalStyle.input}
          placeholderTextColor={colors.darkGrey}
          value={societe}
          onChangeText={text => setSociete(text)}
        />
        <Text style={[styles.error, {opacity: 0}]}>Champ requis</Text>
        <Text style={styles.text}>Job Title</Text>
        <TextInput
          style={[globalStyle.input]}
          placeholderTextColor={colors.darkGrey}
          value={jobTitle}
          onChangeText={text => setJobTitle(text)}
        />
        <Text style={[styles.error, {opacity: 0}]}>Champ requis</Text>
        <Text style={styles.text}>Commentaire</Text>
        <TextInput
          style={[
            globalStyle.input,
            {height: 120, lineHeight: 20, paddingTop: 20},
          ]}
          placeholderTextColor={colors.darkGrey}
          value={comment}
          onChangeText={text => setComment(text)}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginLeft: 10,
  },
  textNom: {
    marginLeft: 10,
  },
  container: {
    top: 30,
    flexGrow: 1,
    padding: 20,
    width: '100%',
    paddingBottom: 300,
  },
  wrapper: {
    flex: 1,
    top: 25,
  },
  button: {
    backgroundColor: '#77CB8F',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 0,
    padding: 0,
    borderWidth: 0,
    alignSelf: 'flex-start',
  },
  checkBoxText: {
    color: 'black',
    marginLeft: 10,
  },
  contentContainer: {
    paddingBottom: 300,
  },
  error: {
    color: colors.red,
    fontSize: 10,
    margin: 0,
    padding: 0,
    marginTop: 5,
  },
});

export default EditAttendeesComponent;
