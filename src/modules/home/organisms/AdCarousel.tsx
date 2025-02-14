import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {screenWidth} from '@utils/Constants';
import FlimSlip from '@modules/home/molecules/FlimSlip';
import Dot from '@modules/home/molecules/Dot';

const AdCarousel: React.FC = ({data}: any) => {
  const [active, setActive] = useState(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 1.25,
  };

  return (
    <View>
      <FlimSlip />
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3500}
        onSnapToItem={(index: any) => setActive(index)}
        data={data.data}
        renderItem={({item}: any) => (
          <Pressable style={styles.imageContainer}>
            <Image source={item?.image_uri} style={styles.img} />
          </Pressable>
        )}
      />
      {active != null && (
        <View style={styles.dots}>
          {data?.data?.map((item: any, index: any) => (
            <Dot active={active} index={index} key={index} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dots: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default AdCarousel;
