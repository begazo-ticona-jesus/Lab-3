import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CursoList from '../screens/homeScreen';
import MatriculaForm from '../screens/matriculaFormScreen';
import MatriculaList from '../screens/matriculaListScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={CursoList}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='home' color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen
                    name="Create"
                    component={MatriculaForm}
                    options={{
                        tabBarLabel: 'Create',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='create' color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen
                    name="List"
                    component={MatriculaList}
                    options={{
                        tabBarLabel: 'List',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='list' color={color} size={size} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
