import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import HeaderComponent from '../header/HeaderComponent';
import colors from '../../colors/colors';
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';


const ScannComponent = () => {
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const handleBackPress = () => {
    // Define what happens when back is pressed. For example:
    navigation.navigate('Attendees'); // This uses React Navigation's goBack function
  };

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    // You can handle the scanned data here
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
  };

  useEffect(() => {
    return () => {
      setScanned(false); // Reset scanned state when component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <HeaderComponent
          title={'Scan QR Code'}
          color={colors.greyCream}
          handlePress={handleBackPress}
        />
      </View>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false} // Set captureAudio to false
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 0,
  },
  overlay: {
    zIndex: 1,
  },
});

export default ScannComponent;
