import React, {useEffect, useState} from 'react';
import {View, ScrollView, TextInput, StyleSheet} from 'react-native';
import colors from '../../colors/colors';
import LargeButton from '../elements/buttons/LargeButton';
import globalStyle from '../../assets/styles/globalStyle';
import FailComponent from '../elements/notifications/FailComponent';

const ConnexionComponent = ({
  userName,
  password,
  setUserName,
  setPassword,
  handleLogin,
}) => {
  const [eventDetails, setEventDetails] = useState(null);
  /*   const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(''); */
  const [loginStatus, setLoginStatus] = useState(''); // Null au départ
  const [success, setSuccess] = useState(null);
  /*   const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const loginResult = await loginUser(userName, password);
      if (loginResult) {
        // Gérer la réussite de la connexion
        console.log('Connexion réussie');

        navigation.reset({
          index: 0,
          routes: [{name: 'Events'}],
        });
      } else {
        // Gérer l'échec de la connexion
        console.log('Échec de la connexion');
      }
    } catch (error) {
      // Gérer l'erreur de connexion
      console.error('Erreur lors de la tentative de connexion:', error);
    }
  }; */

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {success === false && (
        <FailComponent
          onClose={() => setSuccess(null)}
          text={"Mot de pass ou nom d'utilisateur\n incorrect"}
        />
      )}
      <TextInput
        style={globalStyle.input}
        placeholder="Nom d'utilisateur"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
      />
      <View style={{alignItems: 'center', width: '100%'}}>
        <LargeButton
          title="Enregister"
          onPress={handleLogin}
          backgroundColor={colors.green}
          // Assurez-vous que le style de LargeButton ne définit pas width: '100%'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
  },
});

export default ConnexionComponent;
