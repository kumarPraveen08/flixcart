import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {slipData} from '@utils/db';
import Icon from '@components/atoms/Icon';

const FlimSlip = () => {
  return (
    <View>
      <AutoScroll style={styles.container} endPaddingWidth={0} duration={14000}>
        <View style={styles.gridContainer}>
          {slipData.map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Text style={styles.gridText}>
                {'     '}
                {item}
              </Text>
              <Text style={styles.gridText}>{'     '}</Text>
              <Icon
                name="star-four-points"
                size={18}
                color="#888"
                iconFamily="MaterialCommunityIcons"
              />
            </View>
          ))}
        </View>
      </AutoScroll>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridItem: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  gridText: {
    fontSize: RFValue(12),
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default FlimSlip;
