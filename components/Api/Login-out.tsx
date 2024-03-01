// Filename: AuthenticationService.js
import axios from 'axios';
import {Buffer} from 'buffer';
import {useEffect} from 'react';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

// Function to encode userName and password to Base64
const encodeBase64 = value => Buffer.from(value).toString('base64');

// Login Function
// Example loginUser function adjustment for error handling
export const loginUser = async (userName, password) => {
  const encUserName = encodeURIComponent(encodeBase64(userName));
  const encPassword = encodeURIComponent(encodeBase64(password));

  // Construct URL with query parameters
  //const url = `https://ems.choyou.fr/event_api/ajax_user_login/?userName=${userName}&enc_password=${encPassword}`;

  // Make a GET request with Axios to the constructed URL
  //const response = await axios.get(url);
  try {
    const url = `https://ems.choyou.fr/event_api/ajax_user_login/?enc_email=${encUserName}&enc_password=${encPassword}`;

    // Make a GET request with Axios to the constructed URL
    const response = await axios.get(url);
    if (response.data.status) {
      // Connexion réussie
      storage.set(
        'current_user_login_details_id',
        response.data.user_details.current_user_login_details_id.toString(),
      );

      console.log('Connexion réussie:', response.data);
      // Vous pouvez maintenant stocker les informations de l'utilisateur comme nécessaire
      return response.data.status;
    } else {
      // Échec de la connexion
      console.log('Échec de la connexion');
      return response.data.status;
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};
// Logout Function
export const logoutUser = async () => {
  try {
    // Récupérer l'ID utilisateur depuis MMKV
    const currentUserId = storage.getString('current_user_login_details_id');
    console.log(currentUserId);

    if (!currentUserId) {
      console.log('Aucun utilisateur connecté trouvé.');
      return;
    }

    const response = await axios.post(
      `https://ems.choyou.fr/event_api/ajax_user_logout/${currentUserId}`,
    );
    console.log(response.data);

    if (response.data.status) {
      // Déconnexion réussie
      console.log('Déconnexion réussie');
      // Optionnellement, supprimez l'ID utilisateur du stockage après la déconnexion
      storage.delete('current_user_login_details_id');
    } else {
      // Échec de la déconnexion
      console.log('Échec de la déconnexion');
    }
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
  }
};

//

export const getEventAttendeeDependentDetails = async () => {
  try {
    const url = `https://ems.choyou.fr/event_api/ajax_get_event_details/?enc_email=${current_user_login_details_id}&enc_password=${encPassword}`;

    // Make a GET request with Axios to the constructed URL
    const response = await axios.get(url);
    if (response.data.status) {
      storage.set(
        'event_attendee_type_arr',
        JSON.stringify(response.data.event_attendee_type_arr),
      );
      return response.data;
    } else {
      console.error('Failed to fetch event details');
      return null;
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
    return null;
  }
};

export const getEventDetails = async () => {
  try {
    const url = `https://ems.choyou.fr/event_api/ajax_get_event_details/?user_id=${current_user_login_details_id}&is_event_from=${0}`;

    // Make a GET request with Axios to the constructed URL
    const response = await axios.get(url);
    if (response.data.status) {
      storage.set('event_details', JSON.stringify(response.data.event_details));
      return response.data;
    } else {
      console.error('Failed to fetch event details');
      return null;
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
    return null;
  }
};
