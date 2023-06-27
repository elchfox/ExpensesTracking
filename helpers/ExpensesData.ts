import {IExpense, IUser} from '../types';
import {getData, setData} from './storage';

export const getListOfExpenses = async () => {
  let expenses: IExpense[] = await getData('expenses');
  return expenses ? expenses : [];
};
export const getExpensesAndAllInfo = async () => {
  let expenses = await getExpenses()
  let totalExpenses = expenses.reduce((prev, current) => 
  {
    prev += current.amount
    return prev
  }
    , 0)
  return {totalExpenses,expenses}
};
export const getExpenses = async () => {
  let expenses: IExpense[] = await getListOfExpenses();
  let user: IUser = await getData('currentUser');
  return expenses.filter(item => item.userId === user.id).reverse();
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
  return await getExpenses();
};

export const removeExpense = async (id: string) => {
  let expenses: IExpense[] = await getListOfExpenses();
  let indexOf = expenses.findIndex(item => item.id === id);
  if (indexOf >= 0) {
    expenses.splice(indexOf, 1);
  }
  setData('expenses', expenses);
  return await getExpenses();
};
