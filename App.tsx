import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './componentes/Header';
import {checkUserExist} from './helpers/UsersData';
import {InfoContext} from './helpers/useContext';
import Home from './screens/Home';
import Login from './screens/Login';
import WellcomeScreen from './screens/WellcomeScreen';
import {IExpense, IInfoAboutExpense} from './types';

const Stack = createNativeStackNavigator();

function App({}): JSX.Element {
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
    let user: boolean = await checkUserExist();
    setRouteName(user ? 'Home' : 'Login');
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
            name="Home"
            component={Home}
            options={{
              headerTitle: props => <Header {...props} />,
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </InfoContext.Provider>
  );
}

export default App;
