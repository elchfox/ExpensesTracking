import {StackActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {userLogout} from '../helpers/UsersData';
import {InfoContext} from '../helpers/useContext';
import style from '../../styles';

const Profile: React.FC<any> = ({navigation}) => {
  const {allInfoExpenses} = useContext(InfoContext);
  const logout = () => {
    userLogout();
    navigation.dispatch(StackActions.replace('Login'));
  };
  return (
    <View style={[style.wapperScreen,{justifyContent:'center'}]}>
      <View style={[style.textInput, {flexDirection: 'row'}]}>
        <Text style={{flex: 1, color: 'black'}}>{'Total Expenses Items '}</Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {allInfoExpenses.expenses?.length}
        </Text>
      </View>
      <Text style={style.textInput} onPress={logout}>
        {'Sign Out'}
      </Text>
    </View>
  );
};

export default Profile;
