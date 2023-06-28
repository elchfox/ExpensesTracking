import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FormExpense from '../componentes/Expense/FormExpense';
import Main from '../screens/Main';
import Profile from '../screens/Profile';
import FloatButton from './FloatButton';
import TabBarCustomButton from './TabBarCustomButton';

const Tab = createBottomTabNavigator();
const Tabs: React.FC<any> = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
              headerShown: false,
        //       headerStyle: {
              
        //   }
        tabBarStyle: {
            minHeight: 80,
            borderWidth: 0,
        
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarButton: props => <TabBarCustomButton value="Home" {...props} />,
        }}
      />
      <Tab.Screen
        name="FormExpense"
        component={FormExpense}
        options={{
          tabBarButton: props => <FloatButton value="Profile" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton value="Profile" {...props} />
          ),
        }}
      />

      {/* <TabScreen  name="Restaurants"  value="restaurant" iconName="utensils"
                component={RestaurantsScreen}/> */}
    </Tab.Navigator>
  );
};

export default Tabs;
