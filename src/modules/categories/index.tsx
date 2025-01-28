import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {getCategories} from './api/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '@utils/Constants';
import {navigate} from '@navigation/NavigationUtils';
import axios from 'axios';
import {BASE_URL} from '@store/config';

const Categories = () => {
  const dispatch = useAppDispatch();
  const {data, loading, error} = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate('Products', {id: item?._id, name: item?.name})}
        style={styles.itemContainer}>
        <Image source={{uri: item?.image_uri}} style={styles.img} />
        <Text style={styles.name}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>
          Explore our wide range or categories
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            error && <Text style={styles.subtitle}>There was an error</Text>
          }
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F9EC',
  },
  contentContainer: {
    padding: 10,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: FONTS.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: RFValue(13),
    marginTop: 5,
    color: '#666',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#333',
  },
});

export default Categories;
