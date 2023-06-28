import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {price} from '../../helpers';
import {IExpense, IUser} from '../../types';
import Icon from 'react-native-vector-icons/AntDesign';
import { removeData } from '../../helpers/storage';
import { removeExpense } from '../../helpers/ExpensesData';

interface IExpenseProps extends IExpense {
  showDate?: boolean;
  onDelete?:(id?:string)=> void
}
const Expense: React.FC<IExpenseProps> = props => {
  const navigation = useNavigation<NavigationProp<any>>();

  const {amount, date, title, id, showDate, userId,onDelete} = props;
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
        <View style={{backgroundColor: '#f3f3f3', padding: 8}}>
          <Text style={{color: '#5B58AD'}}>
            {moment(date).format('DD.MM.YYYY')}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('FormExpense', {itemId: props.id})}
        style={{
          padding: 8,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>{title}</Text>
        <View style={{
          flexDirection: 'row',
          gap:8,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 16 }}>{price(amount)}</Text>
          <TouchableOpacity onPress={()=> onDelete && onDelete(id)}>
            <Icon name="delete" />
            </TouchableOpacity>
          </View>
      </TouchableOpacity>
    </>
  );
};

export default Expense;
