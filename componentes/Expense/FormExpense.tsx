import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IExpense, IUser} from '../../types';
import Input from '../Input';
import Button from '../Button';
interface IExpenseProps extends IExpense {}
const FormExpense: React.FC<IExpenseProps> = props => {
  const [expense, setExpense] = useState<IExpense>();
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const onCreate = async () => {
    const userString: string | null = await AsyncStorage.getItem('currentUser');
    if (userString) {
      let user: IUser = JSON.parse(userString);
      setUsername(user.username.toLocaleUpperCase());
    }
  };
  const onChangeField = async (name:string,value:string | number | any) => {
    setExpense({
      ...expense,
      [name]:value
    })
  };

  return (
    <View>
      <Text>{'Create Expense'}</Text>
      <View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Input placeholder="Title"            onChangeText={text => onChangeField("title",text)}
/>
        <Input placeholder="Amount"            onChangeText={text => onChangeField("amount",text)}
/>
      </View>

      <View style={{alignItems: 'center'}}>
        <Button text="Login" onPress={onCreate} />
      </View>
    </View>
  );
};

export default FormExpense;
