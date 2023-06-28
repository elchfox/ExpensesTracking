import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Expense from '../componentes/Expense';
import {price} from '../helpers';
import {getExpensesAndAllInfo} from '../helpers/ExpensesData';
import {IExpense, IFilterObj} from '../types';
import FilterScreen from './FilterScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Main: React.FC<any> = ({navigation}) => {
  const [expenses, setExpenses] = useState<IExpense[]>();
  const [filterObject, setFilterObject] = useState<IFilterObj>({});
  let [allInfoExpenses, setAllInfoExpenses] = useState<any>();
  let [filterVisible, setFilterVisible] = useState<boolean>(false);

  let currentDate = '';

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let allInfoExpenses = await getExpensesAndAllInfo();
    setAllInfoExpenses(allInfoExpenses);
    setExpenses(allInfoExpenses.expenses);
  };

  const filterData = () => {
    return expenses?.filter(item => {
      // Check each condition
      if (filterObject.title) {
        return item.title.includes(filterObject.title);
      }

      if (filterObject.fromDate && filterObject.toDate) {
        return (
          item.date >= new Date(filterObject.fromDate) &&
          item.date <= new Date(filterObject.toDate)
        );
      }

      if (filterObject.minAmount && item.amount >= filterObject.minAmount) {
        if (filterObject.maxAmount) {
          return item.amount <= filterObject.maxAmount;
        }
        return true;
      }
      if (filterObject.maxAmount && item.amount <= filterObject.maxAmount) {
        if (filterObject.minAmount) {
          return item.amount >= filterObject.maxAmount;
        }
        return true;
      }

      // If all conditions are satisfied, keep the item in the filtered array
      return true;
    });
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
              {price(allInfoExpenses?.totalExpenses)}
            </Text>
          </Text>
          {allInfoExpenses?.expenses && (
            <TouchableOpacity
              onPress={() => setFilterVisible(true)}
              style={{
                // justifyContent: 'center',
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
          )}
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 30}}
          data={filterData()}
          renderItem={({item}) => {
            let showDate =
              currentDate !== moment(item.date).format('MM.DD.YYYY');
            if (showDate) {
              currentDate = moment(item.date).format('MM.DD.YYYY');
            }

            return <Expense {...item} showDate={showDate} />;
          }}
        />
      </View>
      {filterVisible && (
        <FilterScreen
          onFilter={data => {
            setFilterObject(data);
            setFilterVisible(false);
          }}
          onClose={() => setFilterVisible(false)}
        />
      )}
    </>
  );
};

export default Main;
