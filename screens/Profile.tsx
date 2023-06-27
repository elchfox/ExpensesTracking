import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {IExpense} from '../types';
import {getExpenses} from '../helpers/ExpensesData';
import { removeData } from '../helpers/storage';
import { userLogout } from '../helpers/UsersData';
import { StackActions } from '@react-navigation/native';

const Profile: React.FC<any> = ({navigation}) => {
  const [expenses, setExpenses] = useState<IExpense[]>();

  // const navigation = useNavigation()

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let expenses = await getExpenses();
    setExpenses(expenses);
  };


  const logout = () => {
    userLogout()
    navigation.dispatch(StackActions.replace('Login'));
  }
  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <Text
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#BFBFBF',
          padding: 4,
          width: '100%',
        }}
        >
        {expenses?.length}
      </Text>
      <Text
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#BFBFBF',
          padding: 4,
          width: '100%',
        }}
        onPress={logout}>
        {'Logout'}
      </Text>
    </View>
  );
};

export default Profile;
