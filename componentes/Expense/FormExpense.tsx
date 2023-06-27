import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {createExpense, editExpense} from '../../helpers/ExpensesData';
import {getData} from '../../helpers/storage';
import {IExpense} from '../../types';
import Button from '../Button';
import Input from '../Input';
const initData: IExpense = {
  title: '',
  amount: 0,
  date: new Date(),
};
interface IExpenseProps {
  data?: IExpense;
}
const FormExpense: React.FC<IExpenseProps> = props => {
  const {data} = props;
  const [expense, setExpense] = useState<IExpense>({...initData, ...data});
  const [showDate, setShowDate] = useState<boolean>(false);

  const onCreate = async () => {
    if (expense.id) {
     await editExpense(expense);
    } else {
      await createExpense(expense);
    }
  };
  const onChangeField = async (name: string, value: string | number) => {
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    let selectedDate = date || new Date();
    setShowDate(false);
    setExpense({
      ...expense,
      date: selectedDate,});
  };
  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <Text>{'Create Expense'}</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
        }}>
        <Input
          placeholder="Title"
          defaultValue={expense?.title}
          onChangeText={text => onChangeField('title', text)}
        />
        <Input
          placeholder="Amount"
          defaultValue={expense?.amount.toString()}
          onChangeText={text => onChangeField('amount',Number(text))}
        />
        <Text style={{
           borderBottomWidth: 1,
           borderBottomColor: '#BFBFBF',
           padding: 4,
           width: '100%',
        }} onPress={() => setShowDate(true)}>
          {moment(expense?.date).format('DD.MM.YYYY')}
        </Text>
        {showDate && (
          <DateTimePicker
            value={expense?.date ? expense?.date : new Date()}
            mode="datetime"
            onChange={onChange}
          />
        )}
      </View>

      <View style={{alignItems: 'center'}}>
        <Button text="Create" onPress={onCreate} />
      </View>
    </View>
  );
};

export default FormExpense;
