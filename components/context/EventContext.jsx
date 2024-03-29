import React, {createContext, useContext, useState} from 'react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({children}) => {
  const [eventDetails, setEventDetails] = useState({
    secretCode: '',
    eventId: '',
  });

  // Ajouter l'état de connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateEventDetails = ({newSecretCode, newEventId, newEventName}) => {
    setEventDetails({
      secretCode: newSecretCode,
      eventId: newEventId,
      eventName: newEventName,
    });
    console.log('Mise à jour effectuée', {
      secretCode: newSecretCode,
      eventId: newEventId,
    });
  };

  // Fonction pour mettre à jour l'état de connexion
  const login = status => {
    setIsLoggedIn(status);
  };

  const [refreshList, setRefreshList] = useState(false);
  const triggerListRefresh = () => {
    setRefreshList(prev => !prev); // Basculer l'état pour forcer le rafraîchissement
  };

  return (
    <EventContext.Provider
      value={{
        ...eventDetails,
        updateEventDetails,
        refreshList,
        triggerListRefresh,
        isLoggedIn,
        login,
      }}>
      {children}
    </EventContext.Provider>
  );
};
