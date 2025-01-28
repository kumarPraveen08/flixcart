import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import {navigate} from '@navigation/NavigationUtils';
import {screenWidth} from '@utils/Constants';

const Sponser = ({data}: any) => {
  return (
    <Pressable style={styles.container} onPress={() => navigate('Categories')}>
      <Image style={styles.img} source={{uri: data?.data![0].image_uri}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginHorizontal: 15,
    width: screenWidth - 30,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
});

export default Sponser;
