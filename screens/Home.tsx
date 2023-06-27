import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IExpense} from '../types';
import {getExpenses} from '../helpers/getData';

const Home: React.FC<any> = ({navigation}) => {
  const [expenses, setExpenses] = useState<IExpense[]>();
  // const navigation = useNavigation()
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let expenses = await getExpenses();
    setExpenses(expenses);
  };

  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <Text>fgvdf</Text>
    </View>
  );
};

export default Home;
