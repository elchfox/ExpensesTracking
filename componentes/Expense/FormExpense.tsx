import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  createExpense,
  editExpense,
  findExpenseById,
} from '../../helpers/ExpensesData';
import {IExpense} from '../../types';
import Button from '../Button';
import Input from '../Input';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
var s = require('../../styles');

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
  const params: any = useRoute().params;
  const [expense, setExpense] = useState<IExpense>({...initData, ...data});
  const [showDate, setShowDate] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    if (params.itemId) {
      let _expense = await findExpenseById(params.itemId);
      setExpense({
        ...expense,
        ..._expense,
      });
    }
  };
  const onCreate = async () => {
    if (expense.id) {
      await editExpense(expense);
    } else {
      await createExpense(expense);
    }
    navigation.navigate('Home');
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
      date: selectedDate,
    });
  };
  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white', gap: 40}}>
      <Text>{`${expense.id ? 'Update' : 'Create'} Expense`}</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 30,
          width: '100%',
        }}>
        <Input
          placeholder="Title"
          defaultValue={expense?.title}
          onChangeText={text => onChangeField('title', text)}
        />
        <Input
          placeholder="Amount"
          defaultValue={expense?.amount.toString()}
          onChangeText={text => onChangeField('amount', Number(text))}
        />
        <Text style={s.textInput} onPress={() => setShowDate(true)}>
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
        <Button
          text={`${expense.id ? 'Update' : 'Create'}`}
          onPress={onCreate}
        />
      </View>
    </View>
  );
};

export default FormExpense;
