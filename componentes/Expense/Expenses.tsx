import moment from 'moment';
import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import Expense from '.';
import { removeExpense } from '../../helpers/ExpensesData';
import FilterScreen from '../../screens/FilterScreen';
import { InfoContext } from '../../screens/Home';
import { IFilterObj } from '../../types';
interface IExpensesProps {
  openFilter?:boolean
  onClose?:()=> void
}
const Expenses: React.FC<IExpensesProps> = props => {
  const {allInfoExpenses} = useContext(InfoContext);
  const [filters, setFilters] = useState<IFilterObj>({
    fromDate: allInfoExpenses.minDate,
    toDate: allInfoExpenses.maxDate,
  });
  let currentDate = '';


  const filterData = () => {
    return allInfoExpenses.expenses?.filter(item => {
      if (filters.title && !item.title.toLowerCase().includes(filters.title)) {
        return false;
      }
      if (filters.minAmount && item.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount && item.amount > filters.maxAmount) {
        return false;
      }
      if (filters.fromDate && new Date(item.date) < filters.fromDate) {
        return false;
      }
      if (filters.toDate && new Date(item.date) > filters.toDate) {
        return false;
      }

      return true;
    });
  };

  const onDelete = (id?: string) => {
    id && removeExpense(id);
  };
  return (
    <>
      {props.openFilter && (
        <FilterScreen
          minDate={allInfoExpenses?.minDate}
          maxDate={allInfoExpenses?.maxDate}
          filterObject={filters}
          onFilter={data => {
            setFilters(data);
            props.onClose && props.onClose()
          }}
          onClose={() => props.onClose && props.onClose()}
        />
      )}
      <FlatList
        contentContainerStyle={{paddingBottom: 30}}
        data={filterData()}
        
        renderItem={({item}) => {
          let showDate = currentDate !== moment(item.date).format('MM.DD.YYYY');
          if (showDate) {
            currentDate = moment(item.date).format('MM.DD.YYYY');
          }
          return <Expense {...item} showDate={showDate} onDelete={onDelete} />;
        }}
      />
    </>
  );
};

export default Expenses;
