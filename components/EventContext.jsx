import React, {createContext, useContext, useState} from 'react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({children}) => {
  const [eventDetails, setEventDetails] = useState({
    secretCode: '',
    eventId: '',
  });

  const updateEventDetails = ({newSecretCode, newEventId}) => {
    setEventDetails({secretCode: newSecretCode, eventId: newEventId});
  };

  return (
    <EventContext.Provider value={{...eventDetails, updateEventDetails}}>
      {children}
    </EventContext.Provider>
  );
};
