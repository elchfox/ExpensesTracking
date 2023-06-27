import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import Button from '../componentes/Button';
import Input from '../componentes/Input';
import {IUser} from '../types';
import {getData} from '../helpers/storage';

const Login: React.FC<any> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const onLogin = async () => {
    let id = username.toLocaleLowerCase().trim().replace(/\s/g, '');
    let user = {
      id,
      username,
    };
    let users: IUser[] = await getData('users');
    const userExist = users.find(item => item.id === user.id);
    if (!userExist) {
      users.push(user);
    } else {
      users.push(user);
    }
    AsyncStorage.setItem('users', JSON.stringify(users));
    AsyncStorage.setItem('currentUser', JSON.stringify(user));
    navigation.dispatch(StackActions.replace('Home'));
  };

  return (
    <View style={{flex: 1, padding: 60, backgroundColor: 'white'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Input
          onChangeText={text => setUserName(text)}
          placeholder="Enter Name"
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Button text="Login" onPress={onLogin} />
      </View>
    </View>
  );
};

export default Login;
