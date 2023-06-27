import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (name: string) => {
  let data: string | null = await AsyncStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};
export const setData = async (name: string, value: any) => {
  AsyncStorage.setItem(name, JSON.stringify(value));
};
