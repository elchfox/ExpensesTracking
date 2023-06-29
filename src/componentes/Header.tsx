import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { IUser } from '../types';

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

  return <Text style={{fontWeight: 'bold'}}>{username}</Text>;
};

export default HeaderTopBar;
