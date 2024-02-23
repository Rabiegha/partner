import React, {useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import ListEvents from './ListEvents';
import SwitchTopBar from '../elements/SwitchTopBar';
import colors from '../../colors/colors';
import Search from '../search/Search';

const Data = Array.from({length: 4}, (_, index) => ({
  id: index.toString(),
  name: `Item ${index + 1}`,
  isOn: false,
}));

const EventComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // État pour gérer quelle section est visible
  const [isSectionOneVisible, setIsSectionOneVisible] = useState(true);

  // Fonction pour basculer entre les sections
  const toAvenirSections = () => {
    setIsSectionOneVisible(true);
  };
  const toPasseesSections = () => {
    setIsSectionOneVisible(false);
  };
  const [filteredData, setFilteredData] = React.useState(Data);

  React.useEffect(() => {
    // Filtrer les données en fonction de la recherche
    const filteredItems = Data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filteredItems);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Search onChange={text => setSearchQuery(text)} />
      <SwitchTopBar
        color1={colors.green}
        color2={colors.grey}
        isSectionOneVisible={isSectionOneVisible}
        toAvenirSections={toAvenirSections}
        toPasseesSections={toPasseesSections}
      />
      {/* Section 1 */}
      {isSectionOneVisible && (
        <View style={styles.section}>
          <FlatList
            style={styles.list}
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ListEvents item={item} searchQuery={searchQuery} />
            )}
          />
        </View>
      )}

      {/* Section 2 */}
      {!isSectionOneVisible && (
        <View style={styles.section}>
          <FlatList
            style={styles.list}
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ListEvents item={item} searchQuery={searchQuery} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    marginTop: 20,
  },
});

export default EventComponent;
