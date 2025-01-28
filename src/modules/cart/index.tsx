import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/atoms/CustomSafeAreaView';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppSelector} from '@store/reduxHook';
import {selectCartItems} from './api/slice';
import {goBack, navigate} from '@navigation/NavigationUtils';
import {Colors} from '@utils/Constants';
import OrderItem from './atoms/OrderItem';
import PlaceOrderButton from './atoms/PlaceOrderButton';

const Cart = () => {
  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector(state => state.account.user) as any;

  const renderItem = ({item}: any) => {
    return <OrderItem item={item} />;
  };
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>My Cart</Text>
        <Text style={styles.number}>
          Deliver to: {user ? user?.phone : '🛒'}
        </Text>
        <Text style={styles.address}>
          {user ? user?.address : 'Login first to place your orders'}
        </Text>
      </View>
      {carts.length > 0 ? (
        <FlatList
          data={carts}
          keyExtractor={item => item?._id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => goBack()}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {carts.length > 0 && <PlaceOrderButton />}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 5,
    borderColor: '#f0f2f5',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: 600,
    color: '#000',
    marginBottom: 8,
  },
  address: {
    color: '#666',
    marginTop: 3,
  },
  number: {
    fontWeight: 500,
  },
  listContainer: {
    paddingBottom: 60,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: Colors.active,
    padding: 10,
  },
  shopNowText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: 500,
  },
});

export default Cart;
