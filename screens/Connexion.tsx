import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import globalStyle from '../assets/styles/globalStyle';
import ConnexionComponent from '../components/screens/ConnexionComponent';
import {loginUser} from '../components/api/Login-out';
import {useNavigation} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import {useEvent} from '../components/context/EventContext';

const storage = new MMKV();

const ConnexionScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = async () => {
    try {
      const loginResult = await loginUser(userName, password);
      if (loginResult) {
        // Gérer la réussite de la connexion
        console.log('Connexion réussie');
        storage.set('isLoggedIn', 'true');
        setIsLoggedIn(true);

        navigation.navigate('Events');
      } else {
        // Gérer l'échec de la connexion
        console.log('Échec de la connexion');
      }
    } catch (error) {
      // Gérer l'erreur de connexion
      console.error('Erreur lors de la tentative de connexion:', error);
    }
  };
  const {login} = useEvent();

  // À l'intérieur de votre fonction de gestion de connexion
  login(true);
  useEffect(() => {
    // Set the status bar style to light-content when MenuScreen component mounts
    StatusBar.setBarStyle('dark-content');
    // Cleanup function
    return () => {
      // Reset the status bar style when MenuScreen component unmounts
      StatusBar.setBarStyle('default');
    };
  }, []);

  return (
    <View style={[globalStyle.backgroundWhite, styles.container]}>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <ConnexionComponent
          userName={userName}
          password={password}
          setUserName={text => setUserName(text)}
          setPassword={text => setPassword(text)}
          handleLogin={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConnexionScreen;
