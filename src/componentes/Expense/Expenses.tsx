import moment from 'moment';
import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Expense from '.';
import {filterExpenses, removeExpense} from '../../helpers/ExpensesData';
import {InfoContext} from '../../helpers/useContext';
import FilterScreen from '../../screens/FilterScreen';
import {IFilters} from '../../types';

const Expenses = () => {
  const {allInfoExpenses} = useContext(InfoContext);
  let [filterVisible, setFilterVisible] = useState<boolean>(false);

  const [filters, setFilters] = useState<IFilters>({
    fromDate: allInfoExpenses.minDate,
    toDate: allInfoExpenses.maxDate,
  });

  let currentDate = '';

  const onDelete = (id?: string) => {
    id && removeExpense(id);
  };
  const onClose = () => {
    setFilterVisible(false);
  };
  return (
    <>
      <View style={{padding: 15}}>
        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          style={styles.filterBtn}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            <Icon name="sliders" /> Filter
          </Text>
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <FilterScreen
          minDate={allInfoExpenses?.minDate}
          maxDate={allInfoExpenses?.maxDate}
          filterObject={filters}
          onFilter={data => {
            setFilters({
              ...data,
              maxAmount: Number(data.maxAmount),
              minAmount: Number(data.minAmount),
            });
            onClose();
          }}
          onClose={onClose}
        />
      )}
      <FlatList
        contentContainerStyle={{paddingBottom: 30}}
        data={filterExpenses(allInfoExpenses.expenses, filters)}
        renderItem={({item, index}) => {
          let showDate =
            index === 0 ||
            currentDate !== moment(item.date).format('MM.DD.YYYY');

          if (showDate) {
            currentDate = moment(item.date).format('MM.DD.YYYY');
          }
          return (
            <Expense
              {...item}
              showDate={showDate}
              lastItem={
                index ===
                filterExpenses(allInfoExpenses.expenses, filters).length - 1
              }
              onDelete={onDelete}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    alignSelf: 'flex-end',
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: '#D9D9D9',
  },
});
export default Expenses;
