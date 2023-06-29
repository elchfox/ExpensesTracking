import React, {ReactNode} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../../styles';

interface IModal {
  title: string;
  children: ReactNode;
  onClose: () => void;
  leftAction?: ReactNode;
}
const ModalCustom: React.FC<IModal> = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={props.onClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={props.onClose}>
        <View
          style={style.modalInner}
          onStartShouldSetResponder={event => true}
          onTouchEnd={e => {
            e.stopPropagation();
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {props.leftAction}
            <Text style={{color: 'black', fontSize: 20}}>{props.title}</Text>
            <Icon onPress={props.onClose} name={'close'} size={20} />
          </View>
          {props.children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCustom;
