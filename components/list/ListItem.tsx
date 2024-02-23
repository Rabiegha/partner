import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomSwitch from './Switch';
import {useNavigation} from '@react-navigation/native';
import colors from '../../colors/colors';

const ListItem = ({item, searchQuery}) => {
  const navigation = useNavigation();

  const highlightSearch = (text, query) => {
    if (!query) {
      return <Text style={{color: 'black'}}>{text}</Text>;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={{color: colors.green}}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={{color: 'black'}}>
          {part}
        </Text>
      ),
    );
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(item.isOn);

  const handleSwitchToggle = newValue => {
    setIsSwitchOn(newValue);
    console.log('Switch toggled for', item.name, 'New Value:', newValue);
  };

  const handleItemPress = () => {
    navigation.navigate('More', {itemName: item.name});
  };

  return (
    <TouchableOpacity onPress={handleItemPress}>
      <View style={styles.listItemContainer}>
        <Text style={styles.itemName}>
          {highlightSearch(item.name, searchQuery)}
        </Text>
        <CustomSwitch value={isSwitchOn} onValueChange={handleSwitchToggle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyCream,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
});

export default ListItem;
