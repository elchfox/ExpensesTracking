import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface IButton extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
}
const Button: React.FC<IButton> = props => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: '#5B58AD',
          borderRadius: 50,
          padding: 15,
          minWidth: 120,
        },
        props.style,
      ]}>
      <Text style={[{color: 'white', textAlign: 'center'}, props.textStyle]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
