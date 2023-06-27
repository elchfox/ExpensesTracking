import { IUser } from '../types';
import { getData } from './storage';

export const checkUserExist = async () => {
  let user: IUser = await getData('currentUser');
  return user.id ? true : false
};