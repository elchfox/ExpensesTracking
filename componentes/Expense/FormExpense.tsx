import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IExpense, IUser} from '../../types';
import Input from '../Input';
import Button from '../Button';
import { getData, setData } from '../../helpers/storage';
import { editExpense } from '../../helpers/ExpensesData';
const initData:IExpense = {
  amount:0,
  title:"",
  date:new Date()

}
interface IExpenseProps extends IExpense {}
const FormExpense: React.FC<IExpenseProps> = props => {
  const [expense, setExpense] = useState<IExpense>(initData);

  const onCreate = async () => {
    let expenses:IExpense[] = await getData("expenses")
    if(props.id){
        editExpense("d")
    }else{
      expenses.push({...expense, 
      })
      await setData("expenses")
      
    }
  };
  const onChangeField = async (name: string, value: string | number) => {
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  return (
    <View>
      <Text>{'Create Expense'}</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Input
          placeholder="Title"
          onChangeText={text => onChangeField('title', text)}
        />
        <Input
          placeholder="Amount"
          onChangeText={text => onChangeField('amount', text)}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Button text="Login" onPress={onCreate} />
      </View>
    </View>
  );
};

export default FormExpense;
