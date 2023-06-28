import {IExpense, IUser} from '../types';
import EventEmitter from './EventEmitter';
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
  let user: IUser = await getData('currentUser');
  return expenses.filter(item => item.userId === user.id).reverse();
};

export const findExpenseById = async (id: string) => {
  let expenses: IExpense[] = await getListOfExpenses();
  return expenses.find(item => item.id === id);
}; 
export const createExpense = async (data: IExpense) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let user: IUser = await getData('currentUser');
  console.log(user);
  expenses.push({
    ...data,
    id: new Date().getTime().toString(),
    userId: user.id,
  });
  setData('expenses', expenses);
  EventEmitter.emit('data-change', expenses);
  return await getExpenses();
};



export const editExpense = async (data: IExpense) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let indexOf = expenses.findIndex(item => item.id === data.id);
  if (indexOf >= 0) {
    expenses[indexOf] = {
      ...expenses[indexOf],
      ...data,
    };
  }
  setData('expenses', expenses);
  EventEmitter.emit('data-change', expenses);
  return await getExpenses();
};

export const removeExpense = async (id: string) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let indexOf = expenses.findIndex(item => item.id === id);
  if (indexOf >= 0) {
    expenses.splice(indexOf, 1);
  }
  setData('expenses', expenses);
  EventEmitter.emit('data-change', expenses);
  return await getExpenses();
};
