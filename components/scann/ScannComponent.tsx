import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import HeaderComponent from '../header/HeaderComponent';
import colors from '../../colors/colors';
import {useNavigation} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const handleBackPress = () => {
  // Define what happens when back is pressed. For example:
  navigation.navigate('Attendees'); // This uses React Navigation's goBack function
};
const QRCodeScannerComponent = () => {
  const onSuccess = e => {
    Alert.alert('QR Code Scanned', e.data, [{text: 'OK'}]);
    // Handle the scanned data (e.data) as required
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
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<Text style={styles.centerText}>Scan your QR code</Text>}
        bottomContent={<View />}
        showMarker={true}
        checkAndroid6Permissions={true}
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});

export default QRCodeScannerComponent;
