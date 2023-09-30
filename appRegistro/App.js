import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CursoList from './screens/homeScreen';
import MatriculaForm from './screens/matriculaFormScreen';
import MatriculaList from './screens/matriculaListScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CursoList} />
        <Tab.Screen name="MatriculaForm" component={MatriculaForm} />
        <Tab.Screen name="MatriculaList" component={MatriculaList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}