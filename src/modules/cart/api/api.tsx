import {navigate} from '@navigation/NavigationUtils';
import {BASE_URL} from '@store/config';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

export const createTransaction = async (amount: number, userId: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/order/transaction`, {
      userId,
      amount: amount * 100,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createOrder = async (
  key: string,
  amount: number,
  order_id: string,
  carts: any,
  userId: string,
  address: string,
) => {
  try {
    const options = {
      description: 'Ecommerce Shopping',
      image: '',
      currency: 'INR',
      key: key,
      amount: amount,
      name: 'FlixKart',
      order_id: order_id,
      theme: {
        color: '#53a20e',
      },
    };

    RazorpayCheckout.open(options)
      .then(async data => {
        const today = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);

        const res = await axios.post(`${BASE_URL}/order`, {
          razorpay_order_id: order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature,
          userId: userId,
          cartItems: carts,
          deliveryDate: sevenDaysFromNow,
          address: address,
        });

        navigate('PaymentSuccess', {price: amount / 100, address: address});
      })
      .catch((error: any) => {
        console.log(error);
        return {type: 'error', message: error?.description};
      });
  } catch (error) {
    console.log(error);
    return null;
  }
};
