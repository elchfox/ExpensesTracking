import React, {useEffect, useState} from 'react';
import {Modal, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Input from '../componentes/Input';
import {getMinMaxDate} from '../helpers/ExpensesData';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from '../componentes/Button';
import {IExpense, IFilterObj} from '../types';
const initialData = {};
interface IFilter {
  onFilter: (data: IFilterObj) => void;
  onClose: () => void;
}
const FilterScreen: React.FC<IFilter> = props => {
  const [expenses, setExpenses] = useState<IExpense[]>();
  const [typeDatePicker, setTypeDatePicker] = useState<'from' | 'to' | null>(
    null,
  );

  let [filterObject, setFilterObject] = useState<IFilterObj>(initialData);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let {maxDate, minDate} = await getMinMaxDate();
    setFilterObject({
      ...filterObject,
      fromDate: minDate,
      toDate: maxDate,
    });
  };

  const onChangeField = async (name: string, value: string | number) => {
    setFilterObject({
      ...filterObject,
      [name]: value,
    });
  };

  const onChangeDate = (
    date: Date | undefined,
    type: 'fromDate' | 'toDate',
  ) => {
    let selectedDate = date || new Date();
    setTypeDatePicker(null);
    setFilterObject({
      ...filterObject,
      [type]: selectedDate,
    });
  };

  const onChangeAmount = (amount: number, type: 'minAmount' | 'maxAmount') => {
    setFilterObject({
      ...filterObject,

      [type]: amount,
    });
  };

  const onClose = () => {
    props.onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}>
      <View
        style={{
          position: 'absolute',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          right: 0,
          left: 0,
          bottom: 0,
          justifyContent: 'center',
          padding: 15,
          flexDirection: 'column',
          gap: 50,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.8,
          shadowRadius: 1.84,

          elevation: 8,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{color: '#455EFF'}}
            onPress={() => setFilterObject(initialData)}>
            Clean
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>Filter</Text>
          <Icon onPress={onClose} name={'close'} size={20} />
        </View>
        <View
          style={{flexDirection: 'column', gap: 30, flex: 1, width: '100%'}}>
          <Input
            onChangeText={text => onChangeField('title', text)}
            placeholder="Title"
            value={filterObject.title}
          />
          <View>
            <Input
              onChangeText={text => onChangeField('amount', text)}
              placeholder="Amount"
              value={filterObject?.minAmount?.toString()}
              keyboardType="numeric"
            />
            <Input
              onChangeText={text => onChangeField('amount', text)}
              placeholder="Amount"
              value={filterObject?.maxAmount?.toString()}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              gap: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                padding: 4,
              }}
              onPress={() => setTypeDatePicker('from')}>
              {moment(filterObject?.fromDate).format('DD.MM.YYYY')}
            </Text>
            <Text
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                padding: 4,
              }}
              onPress={() => setTypeDatePicker('to')}>
              {moment(filterObject?.toDate).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
        {typeDatePicker === 'from' && (
          <DateTimePicker
            minimumDate={
              filterObject?.fromDate ? filterObject?.fromDate : new Date()
            }
            maximumDate={
              filterObject?.toDate ? filterObject.toDate : new Date()
            }
            value={filterObject?.fromDate ? filterObject?.fromDate : new Date()}
            mode="datetime"
            onChange={(event, date) => onChangeDate(date, 'fromDate')}
          />
        )}
        {typeDatePicker === 'to' && (
          <DateTimePicker
            minimumDate={
              filterObject?.fromDate ? filterObject?.fromDate : new Date()
            }
            maximumDate={
              filterObject?.toDate ? filterObject.toDate : new Date()
            }
            value={filterObject?.toDate ? filterObject.toDate : new Date()}
            mode="datetime"
            onChange={(event, date) => onChangeDate(date, 'toDate')}
          />
        )}
        <View style={{alignItems: 'center'}}>
          <Button text="Filter" onPress={() => props.onFilter(filterObject)} />
        </View>
      </View>
    </Modal>
  );
};

export default FilterScreen;
