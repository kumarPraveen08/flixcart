import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '@navigation/NavigationUtils';
import Icon from '@components/atoms/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {fileMapCacheDirectory} from 'metro.config';
import UniversalAdd from './UniversalAdd';

const ProductItem: React.FC<{item: any; isOdd: boolean}> = ({item, isOdd}) => {
  return (
    <View style={[styles.productCard, {marginRight: isOdd ? 0 : 10}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.image_uri}} style={styles.productImage} />
        {!item?.ar_uri && (
          <TouchableOpacity
            style={styles.button3d}
            onPress={() => navigate('ARViewer', {uri: item?.ar_uri})}>
            <Icon
              name="cube-scan"
              size={20}
              color="#000"
              iconFamily="MaterialCommunityIcons"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.productName}>{item?.name}</Text>
        <Text numberOfLines={2} style={styles.productDesc}>
          {item?.description}
        </Text>
        <Text style={styles.productPrice}>
          <Text style={{textDecorationLine: 'line-through'}}>
            ₹{item?.price + 599}
          </Text>{' '}
          {item?.price}
        </Text>
        <View style={styles.flexRow}>
          <View style={styles.hotDealContainer}>
            <Text style={styles.hotDealText}>Hot Deal</Text>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    width: '48%',
    overflow: 'hidden',
    marginBottom: 10,
    margin: 6,
  },
  imageContainer: {
    backgroundColor: '#f7f7f7',
    width: '100%',
    height: 240,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button3d: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    elevation: 5,
    zIndex: 1,
  },
  productName: {
    fontSize: RFValue(10),
    marginTop: 10,
  },
  productDesc: {
    fontSize: RFValue(9),
    color: '#555',
    textAlign: 'left',
    marginTop: 5,
  },
  productPrice: {
    fontSize: RFValue(10),
    color: '#000',
    marginTop: 10,
    fontWeight: 500,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotDealContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: '#e7f9ec',
  },
  hotDealText: {
    color: '#35abaf',
    fontSize: RFValue(10),
    fontWeight: 700,
  },
});

export default ProductItem;
