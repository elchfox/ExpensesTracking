import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import Button from '../componentes/Button';
import Input from '../componentes/Input';
import style from '../../styles';
import {IUser} from '../types';
import {currentUser, getUsers} from '../helpers/UsersData';

const Login: React.FC<any> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const onLogin = async () => {
    let id = username.toLocaleLowerCase().trim().replace(/\s/g, '');
    let user = {
      id,
      username,
    };
    let users: IUser[] = await getUsers();
    const userExist = users.find(item => item.id === user.id);
    !userExist && users.push(user);
    AsyncStorage.setItem('users', JSON.stringify(users));
    AsyncStorage.setItem('currentUser', JSON.stringify(user));
    currentUser.id = user.id;
    currentUser.username = user.username;
    navigation.dispatch(StackActions.replace('Main'));
  };

  return (
    <View style={style.wapperScreen}>
      <View style={{flex: 1, justifyContent: 'center', gap: 30, width: '100%'}}>
        <View
          style={{
            width:"100%"
          }}>
          <Input
            onChangeText={text => setUserName(text)}
            label="Enter Name"
            value={username}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button text="Login" onPress={onLogin} />
      </View>
    </View>
  );
};

export default Login;
