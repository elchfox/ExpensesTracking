import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Input from '../componentes/Input';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from '../componentes/Button';
import { IFilterObj } from '../types';
const initialData = {};
interface IFilter {
  minDate?: Date;
  maxDate?: Date;
  filterObject: IFilterObj;
  onFilter: (data: IFilterObj) => void;
  onClose: () => void;
}
const FilterScreen: React.FC<IFilter> = props => {
  const {maxDate, minDate} = props;
  const [typeDatePicker, setTypeDatePicker] = useState<
    'fromDate' | 'toDate' | null
  >(null);

  let [filterObject, setFilterObject] = useState<IFilterObj>(
    props.filterObject,
  );

  const onChangeField = async (name: string, value: string | number | Date) => {
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
    onChangeField(type, selectedDate);
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
          <View
            style={{
              gap: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              onChangeText={text => onChangeField('minAmount', Number(text))}
              placeholder="Min Amount"
              value={filterObject?.minAmount?.toString()}
              keyboardType="numeric"
              style={{flex: 1}}
            />
            <Input
              onChangeText={text => onChangeField('maxAmount', Number(text))}
              placeholder="Max Amount"
              value={filterObject?.maxAmount?.toString()}
              keyboardType="numeric"
              style={{flex: 1}}
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
              onPress={() => setTypeDatePicker('fromDate')}>
              {moment(filterObject?.fromDate).format('DD.MM.YYYY')}
            </Text>
            <Text
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                padding: 4,
              }}
              onPress={() => setTypeDatePicker('toDate')}>
              {moment(filterObject?.toDate).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
        {typeDatePicker === 'fromDate' && (
          <DateTimePicker
            minimumDate={minDate ? minDate : new Date()}
            maximumDate={maxDate ? maxDate : new Date()}
            value={filterObject?.fromDate ? filterObject?.fromDate : new Date()}
            mode="datetime"
            onChange={(event, date) => onChangeDate(date, 'fromDate')}
          />
        )}
        {typeDatePicker === 'toDate' && (
          <DateTimePicker
            minimumDate={minDate ? minDate : new Date()}
            maximumDate={maxDate ? maxDate : new Date()}
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
