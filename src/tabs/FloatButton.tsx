import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../constants/theme';

interface ITabBarCustomButton extends BottomTabBarButtonProps {
  value: string;
}
const FloatButton: React.FC<ITabBarCustomButton> = ({
  accessibilityState,
  onPress,
}) => {

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={accessibilityState?.selected ? 0.9 : 1}
      onPress={onPress}>
         <Icon name="plus" size={30} color={"white"} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button:{
    top: -30,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: COLORS.blue,
    width: 60,
    height: 60,
    borderRadius: 60,
  }
})

export default FloatButton;