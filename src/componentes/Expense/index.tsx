import moment from 'moment';
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {price} from '../../helpers';
import {InfoContext} from '../../helpers/useContext';
import {IExpense} from '../../types';

interface IExpenseProps extends IExpense {
  showDate?: boolean;
  lastItem?: boolean;
  onDelete?: (id?: string) => void;
}
const Expense: React.FC<IExpenseProps> = props => {
  const {amount, date, title, id, showDate, userId, onDelete, lastItem} = props;
  const {setDataExpense, setModalFormExpenses} = useContext(InfoContext);

  return (
    <>
      {showDate && (
        <View
          style={{
            backgroundColor: '#F4EEEE',
            paddingHorizontal: 15,
            paddingVertical: 4,
          }}>
          <Text style={{color: 'black'}}>
            {moment(date).format('DD.MM.YYYY')}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setDataExpense({amount, date, title, id, userId}),
            setModalFormExpenses(true);
        }}
        style={[
          styles.expense,
          {
            borderBottomWidth: lastItem ? 0 : 0.5,
          },
        ]}>
        <Text style={{fontSize: 16, color: '#3E3E3E'}}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>{price(amount ? amount : 0)}</Text>
          <TouchableOpacity onPress={() => onDelete && onDelete(id)}>
            <Icon name="delete" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  expense: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
  },
});
export default Expense;
