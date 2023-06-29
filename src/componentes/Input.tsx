import React, { useRef, useState ,useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
interface IInput extends TextInputProps {
  label: string;
}
const Input: React.FC<IInput> = props => {
  const [labelAnim] = useState(new Animated.Value(0));
  const inputRef = useRef<TextInput | any>(null);

  useEffect(() => {
    if (props.value) { handleFocus() }
    return () => {
      
    };
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
  };
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {props.label}
      </Animated.Text>
      <TextInput
        {...props}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, props.style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 0,
    fontSize: 16,
    color: '#888',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    paddingVertical: 8,
  },
});

export default Input;
