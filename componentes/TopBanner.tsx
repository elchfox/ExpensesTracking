import React from 'react';
import {Text, View} from 'react-native';
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
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        }}>
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

export default TopBanner;
