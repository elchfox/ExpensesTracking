import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input, {DisplayTextInput} from '../componentes/Input';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Button from '../componentes/Button';

import ModalCustom from '../componentes/ModalCustom';
import {IFilters} from '../types';
const initialData = {};
interface IFilter {
  minDate?: Date;
  maxDate?: Date;
  filterObject: IFilters;
  onFilter: (data: IFilters) => void;
  onClose: () => void;
}

const FilterScreen: React.FC<IFilter> = props => {
  const {maxDate, minDate} = props;
  const [typeDatePicker, setTypeDatePicker] = useState<
    'fromDate' | 'toDate' | null
  >(null);

  let [filterObject, setFilterObject] = useState<IFilters>(props.filterObject);

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
    <ModalCustom
      title={`Filters`}
      leftAction={
        <Text
          style={{color: '#455EFF'}}
          onPress={() => setFilterObject(initialData)}>
          Clean
        </Text>
      }
      onClose={onClose}>
      <View style={{flexDirection: 'column', gap: 30, flex: 1, width: '100%'}}>
        <Input
          onChangeText={text => onChangeField('title', text)}
          label="Title"
          value={filterObject.title}
        />
        <View style={styles.rowInputs}>
          <Input
            onChangeText={text => onChangeField('minAmount', text)}
            label="Min Amount"
            value={filterObject?.minAmount?.toString()}
            keyboardType="numeric"
            style={{flex: 1}}
          />
          <Input
            onChangeText={text => onChangeField('maxAmount', text)}
            label="Max Amount"
            value={filterObject?.maxAmount?.toString()}
            keyboardType="numeric"
            style={{flex: 1}}
          />
        </View>
        <View style={styles.rowInputs}>
          <DisplayTextInput
            style={{flex: 1}}
            label="From Date"
            value={
              filterObject?.fromDate
                ? moment(filterObject?.fromDate).format('DD.MM.YYYY')
                : ''
            }
            onPress={() => setTypeDatePicker('fromDate')}
          />

          <DisplayTextInput
            label="To Date"
            style={{flex: 1}}
            value={
              filterObject?.toDate
                ? moment(filterObject?.toDate).format('DD.MM.YYYY')
                : ''
            }
            onPress={() => setTypeDatePicker('toDate')}
          />
        </View>
      </View>
      {typeDatePicker === 'fromDate' && (
        <DateTimePicker
          minimumDate={minDate ? minDate : new Date()}
          maximumDate={maxDate ? maxDate : new Date()}
          value={filterObject.fromDate ? filterObject.fromDate : new Date()}
          mode="datetime"
          onChange={(event, date) => onChangeDate(date, typeDatePicker)}
        />
      )}
      {typeDatePicker === 'toDate' && (
        <DateTimePicker
          minimumDate={minDate ? minDate : new Date()}
          maximumDate={maxDate ? maxDate : new Date()}
          value={filterObject?.toDate ? filterObject.toDate : new Date()}
          mode="datetime"
          onChange={(event, date) => onChangeDate(date, typeDatePicker)}
        />
      )}
      <View style={{alignItems: 'center'}}>
        <Button text="Filter" onPress={() => props.onFilter(filterObject)} />
      </View>
    </ModalCustom>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  rowInputs: {
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
