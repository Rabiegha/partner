import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import colors from '../../colors/colors';
import axios from 'axios';

const List = ({searchQuery}) => {
  const [filteredData, setFilteredData] = useState([]);

  const fetchEventAttendeeDetails = async () => {
    try {
      const url =
        'https://ems.choyou.fr/event_api/ajax_get_event_attendee_details/?event_id=341&attendee_id=91&status_id=2&attendee_status=1';

      // Utilisation de GET pour la requête
      const response = await axios.get(url);

      // Vérifiez que la réponse contient bien les données attendues
      if (
        response.data.status &&
        Array.isArray(response.data.event_attendee_details)
      ) {
        // Filtrer les données en fonction de la recherche et mettre à jour l'état
        const filteredItems = response.data.event_attendee_details.filter(
          item =>
            `${item.first_name} ${item.last_name}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );

        setFilteredData(filteredItems);
      } else {
        console.error(
          'Les données des participants ne sont pas disponibles ou la structure de la réponse est inattendue',
        );
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des détails des participants:',
        error,
      );
    }
  };

  useEffect(() => {
    fetchEventAttendeeDetails();
  }, [searchQuery]);

  return (
    <FlatList
      style={styles.list}
      data={filteredData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ListItem item={item} searchQuery={searchQuery} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 200,
  },
});

export default List;
