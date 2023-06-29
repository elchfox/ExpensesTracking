import React, {ReactNode} from 'react';
import {Modal, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../styles';

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
      <View style={style.modalInner}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {props.leftAction}
          <Text style={{color: 'black', fontSize: 20}}>{props.title}</Text>
          <Icon onPress={props.onClose} name={'close'} size={20} />
        </View>
        {props.children}
      </View>
    </Modal>
  );
};

export default ModalCustom;
