import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IUser} from '../types';

const HeaderTopBar = () => {
  const [username, setUsername] = useState<string>('');
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const init = async () => {
    const userString: string | null = await AsyncStorage.getItem('currentUser');
    if (userString) {
      let user: IUser = JSON.parse(userString);
      setUsername(user.username.toLocaleUpperCase());
    }
  };

  return (
    <View style={{padding: 16, backgroundColor: 'white'}}>
      <Text style={{textAlign: 'center',color:"black"}}>{username}</Text>
    </View>
  );
};

export default HeaderTopBar;
