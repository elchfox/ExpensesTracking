import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {price} from '../helpers';

interface ITopBanner {
  totalExpenses?: number;
  showFilterBtn?: boolean;
}
const TopBanner: React.FC<ITopBanner> = props => {
  const {totalExpenses = 0} = props;
  return (
    <View style={{padding: 15}}>
      <Text
        style={style.text}>
        {'Total Expenses: '}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'normal',
          }}>
          {price(totalExpenses)}
        </Text>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }
})
export default TopBanner;