import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable, Image} from 'react-native';

import {screenWidth} from '@utils/Constants';
import {navigate} from '@navigation/NavigationUtils';
import {RFValue} from 'react-native-responsive-fontsize';

const HorizontalList: React.FC<{data: any}> = ({data}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable onPress={() => navigate('Categories')}>
        <Image source={{uri: item?.image_uri}} style={styles.image} />
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.title}</Text>
      <FlatList
        data={data?.data}
        keyExtractor={item => item.id}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 15}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.6,
    marginRight: 12,
    borderRadius: 15,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  textStyle: {
    fontSize: RFValue(14),
    fontWeight: 800,
    margin: 19,
  },
});

export default HorizontalList;
