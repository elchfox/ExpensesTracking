import {StackActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {userLogout} from '../helpers/UsersData';
import {InfoContext} from './Home';
var s = require('../styles');

const Profile: React.FC<any> = ({navigation}) => {
  const {allInfoExpenses} = useContext(InfoContext);
  const logout = () => {
    userLogout();
    navigation.dispatch(StackActions.replace('Login'));
  };
  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <Text style={s.textInput}>{allInfoExpenses.expenses?.length}</Text>
      <Text style={s.textInput} onPress={logout}>
        {'Logout'}
      </Text>
    </View>
  );
};

export default Profile;
