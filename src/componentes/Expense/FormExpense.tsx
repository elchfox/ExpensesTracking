import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {createExpense, editExpense} from '../../helpers/ExpensesData';
import style from '../../../styles';
import {IExpense} from '../../types';
import Button from '../Button';
import Input from '../Input';
import ModalCustom from '../ModalCustom';

const initData: IExpense = {
  title: '',
  amount: 0,
  date: new Date(),
};
interface IExpenseProps {
  data?: IExpense;
  onClose?: () => void;
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
    onClose();
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

  const onClose = () => {
    props.onClose && props.onClose();
  };
  return (
    <ModalCustom
      title={`${expense.id ? 'Update' : 'Create'} Expense`}
      onClose={onClose}>
      <View
        style={{
          flex: 1,
          gap: 30,
          width: '100%',
        }}>
        <Input
          label="Title"
          value={expense?.title}
          onChangeText={text => onChangeField('title', text)}
        />
        <Input
          label="Amount"
          keyboardType="numeric"
          value={expense.amount > 0 ? expense?.amount.toString() : ''}
          onChangeText={text => onChangeField('amount', text)}
        />
        <Text
          style={[style.textInput, {color: 'black'}]}
          onPress={() => setShowDate(true)}>
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
          disabled={!expense.title || expense?.amount === 0}
          text={`${expense.id ? 'Update' : 'Create'}`}
          onPress={onCreate}
        />
      </View>
    </ModalCustom>
  );
};

export default FormExpense;
