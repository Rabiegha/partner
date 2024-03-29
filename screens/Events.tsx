import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import globalStyle from '../assets/styles/globalStyle';
import EventPasseesScreen from './EventsPassees';
import EventAvenirScreen from './EventsAvenir';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import colors from '../colors/colors';
import Search from '../components/elements/Search';
import {useNavigation} from '@react-navigation/native';
import FiltreComponent from '../components/filtre/FiltreComponent';
import HeaderEvent from '../components/elements/header/HeaderEvent';
import {useEvent} from '../components/context/EventContext';
import {logoutUser} from '../components/api/Login-out';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const Tab = createMaterialTopTabNavigator();

// Créez une fonction pour votre navigation d'onglets
function MyTabs({searchQuery, onEventSelect}) {
  return (
    <Tab.Navigator
      initialRouteName="A venir"
      screenOptions={{
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.grey,
        tabBarIndicatorStyle: {
          backgroundColor: colors.green,
          height: 14,
          borderRadius: 15,
        },
        tabBarStyle: {backgroundColor: 'white', elevation: 0},
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name="A venir">
        {() => (
          <EventAvenirScreen
            searchQuery={searchQuery}
            onEventSelect={onEventSelect}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Passées">
        {() => (
          <EventPasseesScreen
            searchQuery={searchQuery}
            onEventSelect={onEventSelect}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Composant principal EventsScreen
const EventsScreen = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content'); // Use 'light-content' if you prefer the light mode
      return () => {
        // Optionally reset StatusBar style when leaving screen
        StatusBar.setBarStyle('dark-content'); // Adjust according to your app's needs
      };
    }, []),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(-300));
  const openModal = () => {
    setModalVisible(true);
    // Animate the modal to slide in from the left
    Animated.timing(modalAnimation, {
      toValue: 0, // End position of the modal
      duration: 300, // Animation duration
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const closeModal = () => {
    // Animate the modal to slide out to the left
    Animated.timing(modalAnimation, {
      toValue: -300, // Move back to the initial off-screen position
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Hide the modal after the animation
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {updateEventDetails} = useEvent();
  const navigation = useNavigation();

  const handleEventSelect = event => {
    const {ems_secret_code, event_id, event_name} = event;
    console.log(ems_secret_code, event_id);
    updateEventDetails({
      newSecretCode: ems_secret_code,
      newEventId: event_id,
      newEventName: event_name,
    });

    // Ensuite, naviguez vers l'écran souhaité
    navigation.navigate('Tabs', {screen: 'Attendees'}); // Assurez-vous que le nom de l'écran est correct
  };
  const handleGoBack = () => {
    // Check if user is authenticated
    const isLoggedIn = storage.getString('isLoggedIn');
    if (isLoggedIn) {
      // If authenticated, log out
      logoutUser();
    } else {
      navigation.navigate('connexion');
    }
  };

  return (
    <NavigationContainer independent={true}>
      <View style={globalStyle.backgroundWhite}>
        <HeaderEvent onLeftPress={handleGoBack} onRightPress={openModal} />
        <View style={[globalStyle.backgroundWhite, globalStyle.container]}>
          <Search onChange={text => setSearchQuery(text)} />
          <MyTabs searchQuery={searchQuery} onEventSelect={handleEventSelect} />
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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default EventsScreen;
