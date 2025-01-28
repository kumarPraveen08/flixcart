import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import {FONTS, screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import {navigate} from '@navigation/NavigationUtils';

const VerticalList: React.FC<{data: any}> = ({data}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => navigate('Categories')}>
        <Image source={{uri: item?.image_uri}} style={styles.img} />
        <Text style={styles.productText}>{item?.title}</Text>
        <Text style={styles.subText}>{item?.subText}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, {backgroundColor: data?.bgColor}]} />

      <Text style={styles.headingText}>{data?.title}</Text>

      <Pressable
        style={[styles.button, {backgroundColor: data?.btnColor}]}
        onPress={() => navigate('Categories')}>
        <Text style={styles.buttonText}>Explore More</Text>
        <Icon
          size={16}
          name="arrow-forward-sharp"
          iconFamily="Ionicons"
          color="white"
        />
      </Pressable>

      <FlatList
        data={data?.data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  absoluteView: {
    width: screenWidth,
    height: 180,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  headingText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222',
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginVertical: 15,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontWeight: 400,
    color: 'white',
    fontSize: RFValue(12),
  },
  itemContainer: {
    width: '48%',
    margin: 5,
    height: 220,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  img: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    marginTop: 4,
    color: '#222',
  },
  subText: {
    fontSize: RFValue(10),
    fontWeight: 400,
    color: '#222',
  },
  contentContainer: {
    paddingBottom: 10,
  },
});

export default VerticalList;
