import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { IExpense, IUser } from '../../types';
import moment from 'moment';

interface IExpenseProps extends IExpense {
  showDate?: boolean;
}
const Expense: React.FC<IExpenseProps> = props => {
  const {amount,date,title,id,showDate,userId} = props
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
      {showDate && (
        <View style={{backgroundColor:"#f3f3f3",padding:8}}>
          <Text>{moment(date).format('YYYY.MM.DD')}</Text>
        </View>
      )}
      <View  style={{padding:8,flex:1, flexDirection:"row",justifyContent:'space-between', alignItems:"center"}}> 
        <Text>{title}</Text>
        <Text style={{fontSize:16}}>{amount.toLocaleString("en-US", {style:"currency", currency:"USD"})}</Text>
      </View>
    </>
  );
};

export default Expense;
