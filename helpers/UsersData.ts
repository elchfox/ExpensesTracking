import { getData, removeData } from './storage';

export const checkUserExist = async () => {
  let user = await getData('currentUser');
  return user?.id ? true : false
};
export const userLogout = async () => {
  removeData('currentUser');
};