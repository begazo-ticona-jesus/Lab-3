import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CursoList() {
    const [dataSource, setDataSource] = useState([
        {
            nombre: "Data Structures",
            significado: "Estructura de Datos Estructuras de Datos Estructuras de DatosEstructuras de DatosEstructuras de Datos Estructuras de Datos",
            capacidad: 30,
            docente: "Profesor A",
        },
        {
            nombre: "STL",
            significado: "Standard Template Library Estructuras de Datos Estructuras de DatosvEstructuras de Datos Estructuras de Datos Estructuras de Datos ",
            capacidad: 25,
            docente: "Profesor B",
        },
        {
            nombre: "Otro curso",
            significado: "Standard Template Library Estructuras de Datos Estructuras de DatosvEstructuras de Datos Estructuras de Datos Estructuras de Datos ",
            capacidad: 25,
            docente: "Profesor C",
        },
        {
            nombre: "Data Structures",
            significado: "Estructuras de Datos Estructuras de Datos Estructuras de DatosEstructuras de DatosEstructuras de Datos Estructuras de Datos",
            capacidad: 30,
            docente: "Profesor A",
        },
    ]);

    const styles = StyleSheet.create({
        row: {
            margin: 10,
            padding: 10,
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            backgroundColor: '#1e90ff',
            borderRadius: 20,
            elevation: 10,
        },
        rowText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            alignContent: 'center',
        },
        container: {
            alignItems: 'center',
            flex: 1,
            margin: 10,
        },
        bottonItems: {
            color: 'white',
            flexDirection: 'row',
            padding: 5,
        }
    });

    return (
        <FlatList
            style={{ marginTop: 10 }}
            data={dataSource}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <View style={styles.container}>
                        <Text style={styles.rowText}>{item.nombre}</Text>
                        <Ionicons name='library-outline' size={100} color='azure' />
                        <Text style={{ color: 'white', textAlign: 'justify' }}>
                            {item.significado}
                        </Text>
                        <View style={styles.bottonItems}>
                            <Text style={{ padding: 5, color: 'white', fontWeight: 'bold', }}>
                                Capacidad: {item.capacidad}
                            </Text>
                            <Text style={{ padding: 5, color: 'white', fontWeight: 'bold', }}>
                                Docente: {item.docente}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        />
    );
}
