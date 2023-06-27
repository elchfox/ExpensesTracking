import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import Expense from '../componentes/Expense';
import {getExpenses, getExpensesAndAllInfo} from '../helpers/ExpensesData';
import {IExpense} from '../types';
import {price} from '../helpers';
const Main: React.FC<any> = ({navigation}) => {
  const [expenses, setExpenses] = useState<IExpense[]>();
  let [allInfoExpenses, setAllInfoExpenses] = useState<any>();

  let currentDate = '';

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let allInfoExpenses = await getExpensesAndAllInfo();
    setAllInfoExpenses(allInfoExpenses);
    setExpenses(allInfoExpenses.expenses);
  };
  interface IFilterObj {
    title?: string;
    amount?: {
      min: number;
      max?: number;
    };
    date?: {
      from?: string;
      to?: string;
    };
  }
  const filterData = (filterObj: IFilterObj) => {
    
    return expenses?.filter(item => {
      // Check each condition
      if (filterObj.title) {
        return item.title.includes(filterObj.title);
      }
      if (filterObj.date) {
        if (filterObj.date.from && filterObj.date.to) {
          return (
            item.date >= new Date(filterObj.date.from) && item.date <= new Date(filterObj.date.to)
            );
        }
        if (filterObj.date.from) {
          return item.date >= new Date(filterObj.date.from);
        }
        if (filterObj.date.to) {
          return item.date <= new Date(filterObj.date.to);
        }
      }
      
      if (filterObj.amount) {
        if (item.amount >= filterObj.amount.min) {
          if (filterObj.amount?.max) {
            return item.amount <= filterObj.amount?.max;
          }
          return false;
        }
      }
      // If all conditions are satisfied, keep the item in the filtered array
      return true;
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Text
          style={{
            padding: 60,
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {'Expenes '}
          {price(allInfoExpenses?.totalExpenses)}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 30}}
        data={filterData({
          date: {
            from: "2023-02-25",
            // from: new Date("2023-02-25"),
            // to: new Date("19/08/2023")
          },
          amount: {
            min: 50,
            max:1500
          }
        })}
        renderItem={({item}) => {
          let showDate = currentDate !== moment(item.date).format('MM.DD.YYYY');
          if (showDate) {
            currentDate = moment(item.date).format('MM.DD.YYYY');
          }

          return <Expense {...item} showDate={showDate} />;
        }}
      />
    </View>
  );
};

export default Main;
