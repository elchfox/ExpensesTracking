import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { price } from '../helpers';

interface ITopBanner {
  totalExpenses?: number;
  showFilterBtn?: boolean;
  onFilter?: () => void;
}
const TopBanner: React.FC<ITopBanner> = props => {
  const {totalExpenses = 0, showFilterBtn = true, onFilter} = props;
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
      {showFilterBtn && 
        <TouchableOpacity
          onPress={onFilter}
          style={{
            alignSelf: 'flex-end',
            borderRadius: 30,
            padding: 5,
            paddingHorizontal: 15,
            backgroundColor: '#D9D9D9',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            <Icon name="sliders" /> Filter
          </Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default TopBanner;
