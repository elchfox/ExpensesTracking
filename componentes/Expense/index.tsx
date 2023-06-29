import {NavigationProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {price} from '../../helpers';
import {IExpense} from '../../types';
import {InfoContext} from '../../helpers/useContext';

interface IExpenseProps extends IExpense {
  showDate?: boolean;
  onDelete?: (id?: string) => void;
}
const Expense: React.FC<IExpenseProps> = props => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {amount, date, title, id, showDate, userId, onDelete} = props;
  const {setDataExpense, setModalFormExpenses} = useContext(InfoContext);

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
        onPress={() => {
          setDataExpense({amount, date, title, id, userId}),
            setModalFormExpenses(true);
        }}
        style={{
          padding: 16,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize:16,color:"#3E3E3E"}}>{title}</Text>
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

export default Expense;
