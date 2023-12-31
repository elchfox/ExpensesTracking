import {IExpense, IFilters} from '../types';
import EventEmitter from './EventEmitter';
import {currentUser} from './UsersData';
import {getData, setData} from './storage';

export const getListOfExpenses = async () => {
  let expenses: IExpense[] = await getData('expenses');
  return expenses ? expenses : [];
};
export const getMinMaxDate = async (expenses: IExpense[]) => {
  let dates: any[] = expenses.reduce((prev: Date[], current) => {
    prev.push(new Date(current.date));
    return prev;
  }, []);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  return {minDate, maxDate};
};
export const getExpensesAndAllInfo = async () => {
  let expenses = await getExpenses();
  let totalExpenses = expenses.reduce((prev, current) => {
    prev += current.amount;
    return prev;
  }, 0);
  const {minDate, maxDate} = await getMinMaxDate(expenses);
  return {totalExpenses, expenses, minDate, maxDate};
};

export const getExpenses = async () => {
  let expenses: IExpense[] = await getListOfExpenses();
  return expenses
    .filter(item => item.userId === currentUser.id)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

export const findExpenseById = async (id: string) => {
  let expenses: IExpense[] = await getListOfExpenses();
  return expenses.find(item => item.id === id);
};
export const createExpense = async (data: IExpense) => {
  let expenses: IExpense[] = await getListOfExpenses();
  expenses.push({
    ...data,
    id: new Date().getTime().toString(),
    userId: currentUser.id,
    amount: Number(data.amount),
  });
  
  return dataChange(expenses);
};

export const editExpense = async (data: IExpense) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let indexOf = expenses.findIndex(item => item.id === data.id);
  if (indexOf >= 0) {
    expenses[indexOf] = {
      ...expenses[indexOf],
      ...data,
      amount: Number(data.amount),
    };
  }
  return dataChange(expenses);
};

export const removeExpense = async (id: string) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let indexOf = expenses.findIndex(item => item.id === id);
  if (indexOf >= 0) {
    expenses.splice(indexOf, 1);
  }
  return dataChange(expenses);
};

const dataChange = async (expenses: IExpense[]) => {
  await setData('expenses', expenses);
  EventEmitter.emit('data-change', expenses);
  return await getExpenses();
};
export const filterExpenses = (expenses: IExpense[], filters: IFilters) => {
  return expenses?.filter(item => {
    if (
      filters.title &&
      !item.title.toLowerCase().trim().includes(filters.title)
    ) {
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
