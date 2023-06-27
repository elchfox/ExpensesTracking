import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './componentes/Header';
import {checkUserExist} from './helpers/UsersData';
import Home from './screens/Home';
import Login from './screens/Login';
import WellcomeScreen from './screens/WellcomeScreen';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function App({}): JSX.Element {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  const [routeName, setRouteName] = useState<string>('');

  const init = async () => {
    let user: boolean = await checkUserExist();
    console.log(user, 'hhhhhhhhh');
    setRouteName(user ? 'Home' : 'Login');
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // navigation.dispatch(StackActions.replace('Home'));
  };
  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <WellcomeScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: props => <Header {...props} /> }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
