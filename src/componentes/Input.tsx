import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import style from '../../styles';
interface IInput extends TextInputProps {
  label: string;
}
const Input: React.FC<IInput> = props => {
  const [labelAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (props.value) {
      handleFocus();
    }
    return () => {};
  }, []);
  const handleFocus = () => {
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!props.value && props.value?.length === 0) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };
  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };
  return (
    <View style={[styles.container, props.style]}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {props.label}
      </Animated.Text>
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input]}
      />
    </View>
  );
};
interface IDisplayTextInput {
  label: string;
  value?: string;
  onPress: () => void;
  style?:ViewStyle
}
const DisplayTextInput: React.FC<IDisplayTextInput> = props => {
  const {onPress, value, label} = props;
  const [labelAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (value) {
      handleFocus();
    }
    return () => {};
  }, []);
  const handleFocus = () => {
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, -8],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };
  return (
    <View style={[styles.container,props.style]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <Animated.Text onPress={onPress} style={[styles.input, {color: 'black'}]}>
        {value}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 0,
    fontSize: 16,
    color: '#888',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    paddingTop: 16,
  },
});
export {DisplayTextInput};
export default Input;
