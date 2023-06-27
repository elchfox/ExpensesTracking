import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Expense from '../componentes/Expense';
import { getExpenses } from '../helpers/ExpensesData';
import { IExpense } from '../types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Main: React.FC<any> = ({navigation}) => {
  const [expenses, setExpenses] = useState<IExpense[]>();
  let currentDate = '';
  // const navigation = useNavigation()
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let expenses = await getExpenses();
    console.log(expenses)
    setExpenses(expenses);
  };

  return (
    <View style={{flex: 1,backgroundColor: 'white'}}>
      <FlatList
        data={expenses}
        renderItem={({item}) => {
          let showDate = currentDate !== moment(item.date).format('YYYY.MM.DD');
          if (showDate) {
            currentDate = moment(item.date).format('YYYY.MM.DD');
          }

          return <Expense {...item} showDate={showDate} />;
        }}
      />
    </View>
  );
};

export default Main;
