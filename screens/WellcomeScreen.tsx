import React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const WellcomeScreen: React.FC<any> = ({navigation}) => {

  return (
    <View style={{flex: 1,justifyContent:"center", alignItems:"center"}}>
      <Text style={{fontSize: 32,fontWeight:"bold",color:"#5B58AD"}}>{'Wellcome'}</Text>
      <Text style={{fontSize: 24}}>{'Expenses Tracking'}</Text>
    </View>
  );
};

export default WellcomeScreen;
