import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {menuData} from '@utils/db';
import MenuItem from '../atoms/MenuItem';
import Icon from '@components/atoms/Icon';
import {Colors} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

const MenuHeader: React.FC<{scrollY: any}> = ({scrollY}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0]);
    return {opacity};
  });

  return (
    <Animated.View style={[styles.container, opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRow}>
        {menuData.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isFocused={focusedIndex === index}
            onSelect={() => setFocusedIndex(index)}
          />
        ))}
      </View>

      <View style={styles.addressContainer}>
        <Icon name="home" iconFamily="Ionicons" size={16} color="#333" />
        <Text style={styles.homeText}>Home</Text>
        <Text numberOfLines={1} style={styles.addressText}>
          123 B Home, New Street, City, State, Country IN
        </Text>
        <Icon
          name="chevron-forward-sharp"
          iconFamily="Ionicons"
          size={16}
          color="#333"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    fontSize: RFValue(10),
  },
  homeText: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addressText: {
    flex: 1,
    color: Colors.text,
    fontSize: RFValue(9),
  },
});

export default MenuHeader;
