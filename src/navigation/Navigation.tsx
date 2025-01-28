import React from 'react';
import Splash from '@modules/onboard';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './NavigationUtils';
import MainNavigator from './MainNavigator';
import Products from '@modules/products';
import Cart from '@modules/cart';
import Categories from '@modules/categories';
import PaymentSuccess from '@modules/payment_success';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
