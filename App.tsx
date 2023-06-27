import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Header from './componentes/Header';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: (props) => <Header {...props} /> }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
