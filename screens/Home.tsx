import React, {useContext, useEffect, useState} from 'react';
import FormExpense from '../componentes/Expense/FormExpense';
import EventEmitter from '../helpers/EventEmitter';
import {getExpensesAndAllInfo} from '../helpers/ExpensesData';
import {InfoContext} from '../helpers/useContext';
import Tabs from '../tabs';
import {IExpense, IInfoAboutExpense} from '../types';

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
    console.log('gfdgdfg');
    let allInfoExpenses: IInfoAboutExpense = await getExpensesAndAllInfo();
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
