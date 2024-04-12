import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Animated, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EventPasseesScreen from './EventsPassees';
import EventAvenirScreen from './EventsAvenir';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import colors from '../../colors/colors';
import Search from '../components/elements/Search';
import {useNavigation} from '@react-navigation/native';
/* import FiltreComponent from '../components/event/filtre/FiltreComponent'; */
import HeaderEvent from '../components/elements/header/HeaderEvent';

import {logoutUser} from '../components/Api/Login-out';
import {MMKV} from 'react-native-mmkv';
import globalStyle from '../assets/styles/globalStyle';
import {useEvent} from '../components/context/EventContext';
import {AuthContext} from '../components/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

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

    navigation.navigate('Tabs', {screen: 'Attendees'});
  };

  const {isLoading, logout} = useContext(AuthContext);
  const handleGoBack = () => {
    logout();
  };

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Update the display based on searchQuery
    setOpacity(searchQuery ? 1 : 0);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };
  return (
    <NavigationContainer independent={true}>
      <Spinner visible={isLoading} />
      <View style={globalStyle.backgroundWhite}>
        <HeaderEvent
          onLeftPress={clearSearch}
          onRightPress={handleGoBack}
          opacity={opacity}
        />
        <View style={[globalStyle.backgroundWhite, globalStyle.container]}>
          <Search onChange={text => setSearchQuery(text)} value={searchQuery} />
          <MyTabs searchQuery={searchQuery} onEventSelect={handleEventSelect} />
          {/* <Modal
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
                  {
                    <FiltreComponent
                      handlePress={closeModal}
                      filterCriteria={filterCriteria}
                      setFilterCriteria={setFilterCriteria}
                    />
                  }
                </Animated.View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal> */}
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
