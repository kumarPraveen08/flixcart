import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, screenWidth} from '@utils/Constants';
import {useRoute} from '@react-navigation/native';
import {goBack, navigate} from '@navigation/NavigationUtils';
import LottieView from 'lottie-react-native';
import {useAppDispatch} from '@store/reduxHook';
import {clearCart} from '@modules/cart/api/slice';

const PaymentSuccess = () => {
  const route = useRoute();
  const orderDetails = route?.params as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      goBack();
      dispatch(clearCart());
      navigate('Account', {isRefresh: true});
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove={true}
        hardwareAccelerationAndroid
      />
      <Text style={styles.orderPlacedText}>
        ORDER PLACED - ₹{orderDetails?.price}
      </Text>
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Delivery to Home</Text>
      </View>
      <Text style={{textAlign: 'center'}}>{orderDetails?.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlacedText: {
    textAlign: 'center',
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.active,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.active,
    textAlign: 'center',
  },
  addressText: {
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default PaymentSuccess;
