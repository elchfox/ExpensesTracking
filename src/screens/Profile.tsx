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
    <View style={style.wapperScreen}>
      <View style={[style.textInput, {flexDirection: 'row'}]}>
        <Text style={{flex: 1, color: 'black'}}>{'Total Expenses Items '}</Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {allInfoExpenses.expenses?.length}
        </Text>
      </View>
      {/* <View style={[style.textInput, {flexDirection:"row"}]}>
        <Text style={{color:"black"}}>{'Logout'}</Text>
      </View> */}
      <Text style={style.textInput} onPress={logout}>
        {'Logout'}
      </Text>
    </View>
  );
};

export default Profile;
