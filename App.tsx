import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderTopBar from './src/componentes/Header';
import { currentUser, getUser } from './src/helpers/UsersData';
import { InfoContext } from './src/helpers/useContext';

import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import COLORS from './src/constants/theme';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import WellcomeScreen from './src/screens/WellcomeScreen';
import { IExpense, IInfoAboutExpense, IUser } from './src/types';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [routeName, setRouteName] = useState<any>('');
  const [allInfoExpenses, setAllInfoExpenses] = useState<IInfoAboutExpense>({
    expenses: [],
    totalExpenses: 0,
  });
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [modalFormExpenses, setModalFormExpenses] = useState<boolean>(false);
  const [dataExpense, setDataExpense] = useState<IExpense>();
  const init = async () => {
    let user: IUser = await getUser();
    if (user?.id) {
      currentUser.id = user.id;
      currentUser.username = user.username;
    }
    setRouteName(user?.id ? 'Main' : 'Login');
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <WellcomeScreen />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={{backgroundColor: COLORS.primary}} />
      <InfoContext.Provider
        value={{
          allInfoExpenses,
          setAllInfoExpenses,
          expenses,
          setExpenses,
          modalFormExpenses,
          setModalFormExpenses,
          dataExpense,
          setDataExpense,
        }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={Home}
              options={{
                header: props => <HeaderTopBar />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </InfoContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
