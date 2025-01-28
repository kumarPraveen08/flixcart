import {
  View,
  Text,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {loginOrSignUp} from '../api/api';
import {setData} from '../api/slice';
import {navigate} from '@navigation/NavigationUtils';
import {clearCart} from '@modules/cart/api/slice';
import {modalStyles} from '@styles/modalStyles';
import Icon from '@components/atoms/Icon';
import {Colors} from '@utils/Constants';

const LoginModal: React.FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.user) as any;
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    const data = await loginOrSignUp(number, address);
    if (data) {
      dispatch(setData(data));
      onClose();
    } else {
      Alert.alert('There was an error');
    }
  };

  useEffect(() => {
    if (user?.phone) {
      setNumber(user?.phone);
      setAddress(user?.address);
    }
  }, [user]);

  const handleLogout = async () => {
    onClose();
    navigate('Home');
    setAddress('');
    setNumber('');
    await dispatch(clearCart());
    await dispatch(setData(null));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback style={modalStyles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={modalStyles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
            <View style={modalStyles.modalContent}>
              <TouchableOpacity style={modalStyles.closeIcon} onPress={onClose}>
                <Icon
                  name="close"
                  color="#fff"
                  size={20}
                  iconFamily="Ionicons"
                />
              </TouchableOpacity>
              <Text style={modalStyles.title}>
                Login in for the best experience
              </Text>
              <Text style={modalStyles.subTitle}>
                Enter your phone number to proceed
              </Text>
              <TextInput
                style={modalStyles.input}
                placeholder="Enter your number"
                value={number}
                maxLength={10}
                onChangeText={setNumber}
                keyboardType="number-pad"
                placeholderTextColor="#ccc"
              />
              <TextInput
                style={modalStyles.input}
                placeholder="Enter your address here"
                value={address}
                multiline
                onChangeText={setAddress}
                placeholderTextColor="#ccc"
              />
              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  style={modalStyles.button}
                  onPress={handleLogin}>
                  <Text style={modalStyles.buttonText}>
                    {!user ? 'Login' : 'Save'}
                  </Text>
                </TouchableOpacity>

                {user && (
                  <TouchableOpacity
                    style={[
                      modalStyles.button,
                      {
                        backgroundColor: 'transparent',
                        borderColor: Colors.active,
                        borderWidth: 1,
                      },
                    ]}
                    onPress={handleLogout}>
                    <Text
                      style={[modalStyles.buttonText, {color: Colors.active}]}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LoginModal;
