import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {
  addItem,
  removeItem,
  selectItemCountById,
} from '@modules/cart/api/slice';
import {Colors} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';

const UniversalAdd = ({item}: any) => {
  const count = useAppSelector(selectItemCountById(item._id));
  const dispatch = useAppDispatch();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#fff' : Colors.active},
      ]}>
      {count === 0 ? (
        <TouchableOpacity
          onPress={() => dispatch(addItem(item))}
          style={styles.add}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => dispatch(removeItem(item))}>
            <Icon
              color="#fff"
              size={RFValue(14)}
              name="minus"
              iconFamily="MaterialCommunityIcons"
            />
          </TouchableOpacity>
          <Text style={styles.text}>{count}</Text>
          <TouchableOpacity onPress={() => dispatch(addItem(item))}>
            <Icon
              color="#fff"
              size={RFValue(14)}
              name="plus"
              iconFamily="MaterialCommunityIcons"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.active,
    width: 65,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  addText: {
    color: Colors.active,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 4,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: 500,
    fontSize: RFValue(12),
  },
});

export default UniversalAdd;
