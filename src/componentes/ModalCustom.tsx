import React, {ReactNode} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../../styles';

interface IModal {
  title: string;
  children: ReactNode;
  onClose: () => void;
  leftAction?: ReactNode;
  transparent?:boolean
}
const ModalCustom: React.FC<IModal> = props => {
  const {children,onClose,title,leftAction,transparent = true} = props

  return (
    <Modal
      animationType="slide"
      transparent={transparent}
      visible={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={onClose}>
        <View
          style={style.modalInner}
          onStartShouldSetResponder={event => true}
          onTouchEnd={e => {
            e.stopPropagation();
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {leftAction}
            <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
            <Icon onPress={onClose} name={'close'} size={20} />
          </View>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCustom;
