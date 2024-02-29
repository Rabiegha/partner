import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import HeaderComponent from '../header/HeaderComponent';
import colors from '../../colors/colors';
import {useNavigation} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CustomMarker from './CustomMarker';

const ScannerComponent = () => {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);

  // Définir 'handleBackPress' correctement à l'intérieur du composant pour accéder à 'navigation'
  const handleBackPress = () => {
    navigation.goBack(); // Utilisez `goBack` ou la navigation spécifique selon vos besoins
  };

  const handleAlertClose = () => {
    setAlertVisible(false); // Réactiver le scanner une fois l'alerte fermée
  };

  const onSuccess = e => {
    if (!alertVisible) {
      setAlertVisible(true);
      Alert.alert('Participation enregistrée', e.data, [
        {
          text: 'OK',
          onPress: handleAlertClose,
        },
      ]);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Réinitialiser l'état lorsque le composant est monté ou revenu à la vue
      setAlertVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <HeaderComponent
          title={'Scan QR Code'}
          color={colors.greyCream}
          handlePress={handleBackPress}
        />
      </View>
      {!alertVisible && (
        <QRCodeScanner
          onRead={onSuccess}
          bottomContent={<View />}
          showMarker={true}
          checkAndroid6Permissions={true}
          cameraStyle={{height: '98%', top: 30}}
          customMarker={<CustomMarker />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  overlay: {
    zIndex: 1,
  },
});

export default ScannerComponent;
