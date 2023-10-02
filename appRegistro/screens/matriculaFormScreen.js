import React from 'react';
import { View, Text, Button } from 'react-native';

export default function MatriculaForm() {

    return (
        <View>
            <Text>Formulario de Matrícula</Text>
            <Button title="Registrar Matrícula" onPress={() => { /* Implementar la lógica de registro */ }} />
        </View>
    );
}