import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import React from 'react';
import {goBack, navigate} from '@navigation/NavigationUtils';
import Icon from '@components/atoms/Icon';

interface SearchBarProps {
  cartLength: number;
}

const SearchBar: React.FC<SearchBarProps> = ({cartLength}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()}>
        <Icon
          name="arrow-left"
          size={24}
          color="#000"
          iconFamily="MaterialCommunityIcons"
        />
      </Pressable>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" iconFamily="Ionicons" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          placeholderTextColor="#666"
        />
      </View>
      <Icon
        name="heart-outline"
        size={24}
        color="#000"
        iconFamily="MaterialCommunityIcons"
      />

      <Pressable onPress={() => navigate('Cart')}>
        <Icon name="cart-sharp" size={24} color="#000" iconFamily="Ionicons" />
        {cartLength > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartLength}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '70%',
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SearchBar;
