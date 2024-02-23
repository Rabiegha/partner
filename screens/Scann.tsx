import {View, Text} from 'react-native';
import QRCodeScanner from '../components/scann/ScannComponent.tsx';

const QRCodeScannerScreen = () => {
  return (
    <View style={{flex: 1}}>
      <QRCodeScanner />
    </View>
  );
};

export default QRCodeScannerScreen;
