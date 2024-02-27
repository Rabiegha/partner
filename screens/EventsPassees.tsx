import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions, StyleSheet, ScrollView} from 'react-native';
import Search from '../components/search/Search';
import {colors} from 'react-native-elements';
import ListEvents from '../components/events/ListEvents';
import globalStyle from '../assets/styles/globalStyle';

const Data = Array.from({length: 4}, (_, index) => ({
  id: index.toString(),
  name: `Item ${index + 1}`,
  isOn: false,
  date: `19/03/202${index + 1}`, // Example date
  lieu: `Location ${index + 1}`, // Example location
}));

const EventPasseesScreen = ({searchQuery, onPress}) => {
  const [filteredData, setFilteredData] = useState(Data);

  useEffect(() => {
    const filteredItems = Data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filteredItems);
  }, [searchQuery]);

  return (
    <View style={[styles.container, globalStyle.backgroundWhite]}>
      {/* Section 1 */}
      <View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListEvents
              item={item}
              searchQuery={searchQuery}
              onPress={onPress}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 2,
  },
  // Autres styles si nécessaire
});

export default EventPasseesScreen;
