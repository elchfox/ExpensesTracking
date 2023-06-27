import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IExpense, IUser} from '../types';
interface IExpenseProps extends IExpense {

}
const Expense: React.FC<IExpenseProps> = props => {
  const [username, setUsername] = useState<string>('');
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const init = async () => {
    const userString: string | null = await AsyncStorage.getItem('currentUser');
    if (userString) {
      let user: IUser = JSON.parse(userString);
      setUsername(user.username.toLocaleUpperCase());
    }
  };
  
  return (
    <>
    {/* {moment(props.date)} */}
    <View>
      <Text>{props.title}</Text>
    </View>
    </>
  );
};

export default Expense;
