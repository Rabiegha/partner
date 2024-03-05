import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddAttendeesComponent from '../components/form/AddAttendeesComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import ParticipantAjoute from '../components/notification/SuccessComponent';
import globalStyle from '../assets/styles/globalStyle';
import FailComponent from '../components/notification/FailComponent';
import SuccessComponent from '../components/notification/SuccessComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useEvent} from '../components/EventContext';

const AddAttendeesScreen = ({navigation}) => {
  const [success, setSuccess] = useState(null);
  const {secretCode, eventId} = useEvent();

  const handleEnregistrer = () => {
    // Logique pour traiter les données du formulaire

    // Simulons le succès ou l'échec de l'enregistrement ici
    const enregistrementReussi = false; // Mettez à false pour simuler un échec

    if (enregistrementReussi) {
      setSuccess(true); // Enregistrement réussi
    } else {
      setSuccess(false); // Enregistrement échoué
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Réinitialiser isVisible à false lorsque l'écran est défocus
      return () => setSuccess(null);
    }, []),
  );

  const handleGoBack = () => {
    navigation.navigate('Attendees');
  };
  return (
    <View style={globalStyle.backgroundWhite}>
      <HeaderComponent
        title="Attendees"
        color={undefined}
        handlePress={handleGoBack}
      />
      {success === true && (
        <SuccessComponent
          onClose={() => setSuccess(null)}
          text={'Participant ajouté avec succès'}
        />
      )}
      {success === false && (
        <FailComponent
          onClose={() => setSuccess(null)}
          text={'Participant non ajouté'}
        />
      )}
      <AddAttendeesComponent
        onPress={handleEnregistrer}
        style={[globalStyle.container, {marginTop: 50}]}
      />
      <Text>Secret Code: {secretCode}</Text>
      <Text>Event ID: {eventId}</Text>
    </View>
  );
};

export default AddAttendeesScreen;
