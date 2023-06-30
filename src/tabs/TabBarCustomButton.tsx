import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import style from '../../styles';

interface ITabBarCustomButton extends BottomTabBarButtonProps {
  value: string;
}
const TabBarCustomButton: React.FC<ITabBarCustomButton> = ({
  accessibilityState,
  onPress,
  value,
}) => {
  var isSelected = accessibilityState?.selected;

  return (
    <TouchableOpacity
      style={[style.centerVH,{
        height: '100%',
        paddingVertical: 15,
        backgroundColor: 'white',
      }]}
      activeOpacity={isSelected ? 0.9 : 1}
      onPress={onPress}>
      <Text style={{color: isSelected ? '#455EFF' : 'black'}}>{value}</Text>
    </TouchableOpacity>
  );
};

export default TabBarCustomButton;
