import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Expenses from '../componentes/Expense/Expenses';
import TopBanner from '../componentes/TopBanner';
import { InfoContext } from './Home';

const Main = () => {
  const {allInfoExpenses} = useContext(InfoContext);
  let [filterVisible, setFilterVisible] = useState<boolean>(false);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopBanner
          onFilter={() => setFilterVisible(true)}
          totalExpenses={allInfoExpenses.totalExpenses}
          showFilterBtn={allInfoExpenses?.expenses.length > 0}
        />
        <Expenses
          openFilter={filterVisible}
          onClose={() => setFilterVisible(false)}
        />
      </View>
    </>
  );
};

export default Main;
