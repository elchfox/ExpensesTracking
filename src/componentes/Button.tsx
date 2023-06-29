import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import style from '../../styles';

interface IButton extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
}
const Button: React.FC<IButton> = props => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[style.button, props.style]}>
      <Text style={[{color: 'white', textAlign: 'center'}, props.textStyle]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
