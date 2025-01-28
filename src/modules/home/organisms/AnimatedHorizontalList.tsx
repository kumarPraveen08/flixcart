import {View, Text, StyleSheet, FlatList, Pressable, Image} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, screenWidth} from '@utils/Constants';
import {navigate} from '@navigation/NavigationUtils';

const AnimatedHorizontalList: React.FC<{data: any}> = ({data}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.imageContainer}
        onPress={() => navigate('Categories')}>
        <Image source={{uri: item?.image_uri}} style={styles.image} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.title}</Text>
      <FlatList
        data={data?.data}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingLeft: 15}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  textStyle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.6,
    marginRight: 15,
  },
});

export default AnimatedHorizontalList;
