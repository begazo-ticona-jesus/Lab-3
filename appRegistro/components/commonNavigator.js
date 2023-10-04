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
                    name="Cursos"
                    component={CursoList}
                    options={{
                        tabBarLabel: 'Cursos',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='book' color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen
                    name="Inscripcion"
                    component={MatriculaForm}
                    options={{
                        tabBarLabel: 'Inscripcion',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='create' color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen
                    name="Alumnos"
                    component={MatriculaList}
                    options={{
                        tabBarLabel: 'Alumnos',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='person' color={color} size={size} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
