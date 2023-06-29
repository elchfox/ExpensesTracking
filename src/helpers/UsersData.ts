import {IUser} from '../types';
import {getData, removeData} from './storage';

export const getUser = async () => {
  let user = await getData('currentUser');
  return user
};
export const userLogout = async () => {
  removeData('currentUser');
};
export const getUsers = async () =>  {
  let users: IUser[] = await getData('users');
  return users ? users : [];
};

export const currentUser: IUser = {
  id: '',
  username: '',
};
