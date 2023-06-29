import React from 'react';
import {IExpense, IInfoAboutExpense} from '../types';

interface InfoContextProps {
  allInfoExpenses: IInfoAboutExpense;
  setAllInfoExpenses: (item: IInfoAboutExpense) => void;
  expenses: IExpense[];
  setExpenses: (item: IExpense[]) => void;
  modalFormExpenses: boolean;
  setModalFormExpenses: (item: boolean) => void;
  dataExpense?: IExpense;
  setDataExpense: (item?: IExpense) => void;
  
}
export const InfoContext = React.createContext<InfoContextProps>({
  allInfoExpenses: {
    expenses: [],
    totalExpenses: 0,
  },
  setAllInfoExpenses: (item: IInfoAboutExpense) => {},
  expenses: [],
  setExpenses: (item: IExpense[]) => {},
  modalFormExpenses: false,
  setModalFormExpenses: (item: boolean) => {},
  dataExpense: undefined,
  setDataExpense: (item?: IExpense) => {}
});
