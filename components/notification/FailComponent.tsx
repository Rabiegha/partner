/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../colors/colors';

const FailComponent = ({onClose, text}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value

  useEffect(() => {
    // Si isVisible est true, démarrez l'animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Durée plus courte pour un effet rapide
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Make sure to render the component regardless of isVisible to allow animation to play
  return (
    <Animated.View style={[styles.notification, {opacity: fadeAnim}]}>
      <View style={styles.textNotification}>
        <Image
          source={require('../../assets/images/icons/Fermer.png')}
          resizeMode="contain"
          style={{
            width: 13,
            height: 13,
            tintColor: colors.red,
            marginRight: 10,
          }}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image
          source={require('../../assets/images/icons/closeButton.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.red,
    backgroundColor: colors.lightRed,
    paddingVertical: 15,
    paddingHorizontal: 15,
    zIndex: 50,
    marginHorizontal: 20,
  },
  textNotification: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.red,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  closeButton: {},
  buttonImage: {
    width: 15,
    height: 15,
    tintColor: colors.red,
    zIndex: 2,
    marginLeft: 10,
  },
});

export default FailComponent;
