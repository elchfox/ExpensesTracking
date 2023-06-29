import React from 'react';
import {Text, View} from 'react-native';
import style from '../styles';

const WellcomeScreen = () => {
  return (
    <View style={style.centerVH}>
      <Text style={{fontSize: 32, fontWeight: 'bold', color: '#5B58AD'}}>
        {'Wellcome'}
      </Text>
      <Text style={{fontSize: 24}}>{'Expenses Tracking'}</Text>
    </View>
  );
};

export default WellcomeScreen;
