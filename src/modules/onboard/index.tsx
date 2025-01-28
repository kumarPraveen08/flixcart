import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {resetAndNavigate} from '@navigation/NavigationUtils';
import {jsiConfigureProps} from 'react-native-reanimated/lib/typescript/core';
import {screenWidth} from '@utils/Constants';

const Splash: React.FC = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => resetAndNavigate('MainNavigator'), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@assets/images/logo_t.png')} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC201',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: 'contain',
  },
});

export default Splash;
