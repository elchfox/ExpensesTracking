import React from 'react';
import {Text, View} from 'react-native';
import style from '../../styles';
import COLORS from '../constants/theme';


const WellcomeScreen = () => {
  return (
    <View style={style.centerVH}>
      <Text style={{fontSize: 32, fontWeight: 'bold', color: COLORS.primary}}>
        {'Wellcome'}
      </Text>
      <Text style={{fontSize: 24}}>{'Expenses Tracking'}</Text>
    </View>
  );
};

export default WellcomeScreen;
