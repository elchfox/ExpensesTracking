import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface ITabBarCustomButton extends BottomTabBarButtonProps {
  value: string;
}
const TabBarCustomButton: React.FC<ITabBarCustomButton> = ({
  accessibilityState,
  children,
  onPress,
  value,
}) => {
  var isSelected = accessibilityState?.selected;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingVertical: 5,
        backgroundColor: 'white',
      }}
      activeOpacity={isSelected ? 0.9 : 1}
      onPress={onPress}>
      <Text style={{color: isSelected ? '#5B58AD' : 'black'}}>{value}</Text>
    </TouchableOpacity>
  );
};

export default TabBarCustomButton;
