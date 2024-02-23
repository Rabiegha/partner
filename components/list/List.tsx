import React from 'react';
import {View, FlatList, Dimensions, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import colors from '../../colors/colors';

const Data = Array.from({length: 10}, (_, index) => ({
  id: index.toString(),
  name: `Item ${index + 1}`,
  isOn: false,
}));

const List = ({searchQuery}) => {
  const [filteredData, setFilteredData] = React.useState(Data);

  React.useEffect(() => {
    // Filtrer les données en fonction de la recherche
    const filteredItems = Data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filteredItems);
  }, [searchQuery]);

  return (
    <FlatList
      style={styles.list}
      data={filteredData}
      keyExtractor={item => item.id}
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
