import React, {useContext, useEffect, useState} from 'react';
import {InfoContext} from '../helpers/useContext';
import EventEmitter from '../helpers/EventEmitter';
import {IInfoAboutExpense} from '../types';
import {getExpensesAndAllInfo} from '../helpers/ExpensesData';
import FormExpense from '../componentes/Expense/FormExpense';
import Tabs from '../tabs';

const Home = () => {
  const {
    setAllInfoExpenses,
    setExpenses,
    setModalFormExpenses,
    setDataExpense,
    modalFormExpenses,
    dataExpense,
  } = useContext(InfoContext);

  useEffect(() => {
    init();
    EventEmitter.on('data-change', init);
  }, []);

  const init = async () => {
    const allInfoExpenses: IInfoAboutExpense = await getExpensesAndAllInfo();
    setAllInfoExpenses(allInfoExpenses);
    setExpenses(allInfoExpenses.expenses);
  };

  return (
    <>
      <Tabs onPressModal={() => setModalFormExpenses(true)} />
      {modalFormExpenses && (
        <FormExpense
          onClose={() => {
            setModalFormExpenses(false);
            setDataExpense(undefined);
          }}
          data={dataExpense}
        />
      )}
    </>
  );
};

export default Home;
