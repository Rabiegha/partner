import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../../colors/colors';
import LargeButton from '../button/LargeButton';
import globalStyle from '../../assets/styles/globalStyle';
import FailComponent from '../notification/FailComponent';
import {useNavigation} from '@react-navigation/native';
// Ensure these functions are exported correctly from your API handling file
import {loginUser} from '../Api/Login-out';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConnexionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async id => {
    try {
      const response = await loginUser(email, password);
      await AsyncStorage.setItem('SESSION_ID', id);
      // Check if response and response.data exist before accessing status
      if (response && response.data && response.data.status) {
        console.log('Login Successful', response.data);
        navigation.reset({
          index: 0,
          routes: [{name: 'Events'}],
        });
        setSuccess(true);
      } else {
        console.log('Login Failed', response.data);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Login Error:', error);
      setSuccess(false);
      console.error('Storage error:', error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {success === false && (
        <FailComponent
          onClose={() => setSuccess(null)}
          text={"Mot de passe ou nom d'utilisateur incorrect"}
        />
      )}
      <TextInput
        style={globalStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyle.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={{alignItems: 'center', width: '100%'}}>
        <LargeButton
          title="Se connecter"
          onPress={handleLogin}
          backgroundColor={colors.green}
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
