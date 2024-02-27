import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Dimensions, StyleSheet, ScrollView} from 'react-native';
import ListEvents from './ListEvents';
import SwitchTopBar from '../elements/SwitchTopBar';
import colors from '../../colors/colors';
import Search from '../search/Search';

const {width} = Dimensions.get('window');
const Data = Array.from({length: 4}, (_, index) => ({
  id: index.toString(),
  name: `Item ${index + 1}`,
  isOn: false,
}));

const EventComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(Data);
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0); // Nouvel état pour suivre la page actuelle

  useEffect(() => {
    const filteredItems = Data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filteredItems);
  }, [searchQuery]);

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
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Fréquence de mise à jour pour l'événement de défilement
      >
        {/* Section 1 */}
        <View style={{width}}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ListEvents item={item} searchQuery={searchQuery} />
            )}
          />
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
      </ScrollView>
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
