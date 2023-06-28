import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
var s = require('../styles');

interface IButton extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
}
const Button: React.FC<IButton> = props => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[s.button, props.style]}>
      <Text style={[{color: 'white', textAlign: 'center'}, props.textStyle]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
