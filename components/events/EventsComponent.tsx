import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions, StyleSheet, ScrollView, Text} from 'react-native';
import ListEvents from './ListEvents';
import SwitchTopBar from '../elements/SwitchTopBar';
import colors from '../../colors/colors';
import Search from '../search/Search';

const {width} = Dimensions.get('window');

const EventComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(Data);
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventDetails();
        if (response && response.status) {
          setEventDetails(response.event_details);
        } else {
          console.error('Failed to fetch event details');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, []);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentPageIndex = Math.round(scrollPosition / width);
    setCurrentPage(currentPageIndex);
  };

  return (
    <View style={styles.container}>
      <Search onChange={text => setSearchQuery(text)} />
      <SwitchTopBar
        color1={currentPage === 0 ? colors.green : colors.grey} // Changement de couleur basé sur la page actuelle
        color2={currentPage === 1 ? colors.green : colors.grey}
        isSectionOneVisible={currentPage === 0}
        toAvenirSections={() => {
          scrollViewRef.current.scrollTo({x: 0, animated: true});
          setCurrentPage(0); // Assurez-vous que l'état de la page actuelle est mis à jour
        }}
        toPasseesSections={() => {
          scrollViewRef.current.scrollTo({x: width, animated: true});
          setCurrentPage(1); // Assurez-vous que l'état de la page actuelle est mis à jour
        }}
      />
      <View>
        {/* Section 1 */}
        <View style={{width}}>
          {eventDetails.map((event, index) => (
            <View key={index} style={{width}}>
              <Text>{event.name}</Text>
              {/* Render other event details as needed */}
            </View>
          ))}
        </View>
        {/* Section 2 */}
        <View style={{width}}>
          <FlatList
            data={filteredData} // Mettez à jour avec des données spécifiques à cette section si nécessaire
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ListEvents item={item} searchQuery={searchQuery} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  // Autres styles si nécessaire
});

export default EventComponent;
