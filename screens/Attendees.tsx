import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import List from '../components/list/List';
import Search from '../components/search/Search';
import ProgressBar from '../components/progress/ProgressBar';
import ProgressText from '../components/progress/ProgressionText';
import globalStyle from '../assets/styles/globalStyle';
import {useNavigation} from '@react-navigation/native';
import HeaderParticipants from '../components/header/HeaderParticipant';
import FiltreComponent from '../components/filtre/FiltreComponent';
import SuccessComponent from '../components/notification/SuccessComponent';

const AttendeesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(-300));
  const [success, setSuccess] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    // Animate the modal to slide in from the left
    Animated.timing(modalAnimation, {
      toValue: 0, // End position of the modal
      duration: 300, // Animation duration
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const showNotification = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const closeModal = () => {
    // Animate the modal to slide out to the left
    Animated.timing(modalAnimation, {
      toValue: -300, // Move back to the initial off-screen position
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Hide the modal after the animation
  };

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Events');
  };
  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderParticipants onLeftPress={handleGoBack} onRightPress={openModal} />
      <View style={styles.container}>
        {/* Bouton pour afficher la notification */}
        <TouchableOpacity onPress={showNotification} style={styles.button}>
          <Text style={styles.buttonText}>Afficher la notification</Text>
        </TouchableOpacity>

        {/* Affichage conditionnel de la notification */}
        {success && (
          <View style={styles.notification}>
            <SuccessComponent
              onClose={() => setSuccess(null)}
              text={'Checked in'}
            />
          </View>
        )}
      </View>
      <View style={[globalStyle.container, styles.container]}>
        <Search onChange={text => setSearchQuery(text)} />
        <ProgressText />
        <ProgressBar progress={40} />
        <List searchQuery={searchQuery} />

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={closeModal}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalView,
                  {transform: [{translateX: modalAnimation}]}, // Use the animated value for the translation
                ]}>
                {<FiltreComponent handlePress={closeModal} />}
              </Animated.View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300, // Width of the modal
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});

export default AttendeesScreen;
