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
        // flex:1
        
      },props.style]}
    />
  );
}

export default Input;
