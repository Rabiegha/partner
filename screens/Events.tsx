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
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import globalStyle from '../assets/styles/globalStyle';
import EventPasseesScreen from './EventsPassees';
import EventAvenirScreen from './EventsAvenir';
import {NavigationContainer} from '@react-navigation/native';
import colors from '../colors/colors';
import Search from '../components/search/Search';
import {useNavigation} from '@react-navigation/native';
import FiltreComponent from '../components/filtre/FiltreComponent';
import HeaderEvent from '../components/header/HeaderEvent';

const Tab = createMaterialTopTabNavigator();

// Créez une fonction pour votre navigation d'onglets
function MyTabs({searchQuery, onPress}) {
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
          <EventAvenirScreen searchQuery={searchQuery} onPress={onPress} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Passées">
        {() => (
          <EventPasseesScreen searchQuery={searchQuery} onPress={onPress} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Composant principal EventsScreen
const EventsScreen = () => {
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

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = item => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Tabs'}],
    });
  };
  const handleGoBack = () => {
    navigation.navigate('Events');
  };

  return (
    <NavigationContainer independent={true}>
      <View style={globalStyle.backgroundWhite}>
        <HeaderEvent onLeftPress={handleGoBack} onRightPress={openModal} />
        <View style={[globalStyle.backgroundWhite, globalStyle.container]}>
          <Search onChange={text => setSearchQuery(text)} />
          <MyTabs searchQuery={searchQuery} onPress={handlePress} />
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
