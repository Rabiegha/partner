import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import ConnexionComponent from '../components/screens/ConnexionComponent';
import {loginUser} from '../components/Api/Login-out';
import {useNavigation} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import globalStyle from '../assets/styles/globalStyle';
import {useEvent} from '../components/context/EventContext';
import {AuthContext} from '../components/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import FailComponent from '../components/elements/notifications/FailComponent';

const storage = new MMKV();

const ConnexionScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, login, fail, resetFail} = useContext(AuthContext);
  /* const handleLogin = async () => {
    try {
      const loginResult = await loginUser(userName, password);
      if (loginResult) {
        loginUser(userName, password, login);
        // Gérer la réussite de la connexion
        console.log('Connexion réussie');
      } else {
        // Gérer l'échec de la connexion
        console.log('Échec de la connexion');
      }
    } catch (error) {
      // Gérer l'erreur de connexion
      console.error('Erreur lors de la tentative de connexion:', error);
    }

    const {login} = useEvent();
    login(true);
  }; */
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
      <Spinner visible={isLoading} />
      {fail === true && (
        <View style={styles.failComponentContainer}>
          <FailComponent
            onClose={() => resetFail()}
            text={'Erreur de connexion'}
          />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <ConnexionComponent
          userName={userName}
          password={password}
          setUserName={text => setUserName(text)}
          setPassword={text => setPassword(text)}
          handleLogin={() => {
            login(userName, password);
            resetFail();
          }}
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
  failComponentContainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
  },
});

export default ConnexionScreen;
