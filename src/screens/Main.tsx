import React, {useContext} from 'react';
import {View} from 'react-native';
import TopBanner from '../componentes/TopBanner';
import {InfoContext} from '../helpers/useContext';
import Expenses from '../componentes/Expense/Expenses';

const Main = () => {
  const {allInfoExpenses} = useContext(InfoContext);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopBanner
        totalExpenses={allInfoExpenses.totalExpenses}
        showFilterBtn={allInfoExpenses?.expenses.length > 0}
      />
      <Expenses />
    </View>
  );
};

export default Main;
