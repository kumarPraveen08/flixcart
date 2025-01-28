import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const Dot: React.FC<{active: number; index: number}> = ({active, index}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (active === index) {
      progress.value = withRepeat(
        withTiming(1, {duration: 3500}),
        1,
        false,
        () => {
          progress.value = 0;
        },
      );
    } else {
      progress.value = 0;
    }
  }, [active, index, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={[styles.container, {width: active === index ? 35 : 20}]}>
      <Animated.View style={[styles.animatedView, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 50,
    backgroundColor: '#dfdfdf',
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  animatedView: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 50,
  },
});

export default Dot;
