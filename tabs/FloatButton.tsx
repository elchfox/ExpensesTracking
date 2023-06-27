import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface ITabBarCustomButton extends BottomTabBarButtonProps {
  value: string;
}
const FloatButton: React.FC<ITabBarCustomButton> = ({
  accessibilityState,
  children,
  onPress,
  value,
}) => {
  var isSelected = accessibilityState?.selected;

  return (
    <TouchableOpacity
      style={{
        top: -30,
        // flex:1,
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#5B58AD',
        width: 60,
        height: 60,
        borderRadius: 60,
      }}
      activeOpacity={isSelected ? 0.9 : 1}
      onPress={onPress}>
      <Text
        style={{
          lineHeight:50,
          color: 'white',
          fontSize: 50,
          
          textAlign: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
          alignContent: 'center',
        }}>
        {'+'}
      </Text>
    </TouchableOpacity>
  );
};

export default FloatButton;
