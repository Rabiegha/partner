import {View, Text} from 'react-native';
import ScannerComponent from '../components/scann/ScannComponent.tsx';

const QRCodeScannerScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScannerComponent />
    </View>
  );
};

export default QRCodeScannerScreen;
