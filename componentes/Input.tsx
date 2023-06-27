import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const  Input: React.FC<TextInputProps> =  (props)=>  {
  return (
    <TextInput
      {...props}
      style={[{
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        padding: 4,
        width: '100%',
        
      },props.style]}
    />
  );
}

export default Input;
