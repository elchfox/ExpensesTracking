import React from 'react';
import { View } from 'react-native';
import FormExpense from '../componentes/Expense/FormExpense';

const Create: React.FC<any> = ({navigation}) => {
  return (
    <View>
      <FormExpense />
    </View>
  );
};

export default Create;
