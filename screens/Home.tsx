import React from 'react';
import { View } from 'react-native';
import Tabs from '../tabs';

const Home: React.FC<any> = ({navigation}) => {

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      
      <Tabs />
    </View>
  );
};

export default Home;
