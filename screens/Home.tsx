import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Tabs from '../tabs';
import {IExpense, IFilterObj, IInfoAboutExpense} from '../types';
import {getExpensesAndAllInfo} from '../helpers/ExpensesData';
import EventEmitter from '../helpers/EventEmitter';
interface InfoContextProps {
  allInfoExpenses: IInfoAboutExpense;
  setAllInfoExpenses: (item: IInfoAboutExpense) => void;
  expenses: IExpense[];
  setExpenses: (item: IExpense[]) => void;
}
export const InfoContext = React.createContext<InfoContextProps>({
  allInfoExpenses: {
    expenses: [],
    totalExpenses: 0,
  },
  setAllInfoExpenses: (item: IInfoAboutExpense) => {},
  expenses: [],
  setExpenses: (item: IExpense[]) => {},
});

const Home: React.FC<any> = ({navigation}) => {
  let [allInfoExpenses, setAllInfoExpenses] = useState<IInfoAboutExpense>({
    expenses: [],
    totalExpenses: 0,
  });
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  useEffect(() => {
    init();
    EventEmitter.on('data-change', init);
    return EventEmitter.off('data-change', init);
  }, []);

  const init = async () => {
    let allInfoExpenses: IInfoAboutExpense = await getExpensesAndAllInfo();
    setAllInfoExpenses(allInfoExpenses);
    setExpenses(allInfoExpenses.expenses);
  };

  return (
    <InfoContext.Provider
      value={{
        allInfoExpenses,
        setAllInfoExpenses,
        expenses,
        setExpenses,
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Tabs />
      </View>
    </InfoContext.Provider>
  );
};

export default Home;
