import React from 'react';
import {Text, View} from 'react-native';
var s = require('../styles');

const WellcomeScreen = () => {
  return (
    <View style={s.centerVH}>
      <Text style={{fontSize: 32, fontWeight: 'bold', color: '#5B58AD'}}>
        {'Wellcome'}
      </Text>
      <Text style={{fontSize: 24}}>{'Expenses Tracking'}</Text>
    </View>
  );
};

export default WellcomeScreen;