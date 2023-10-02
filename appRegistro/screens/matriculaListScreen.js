import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MatriculaList() {
    const [dataSource, setDataSource] = useState([
        {
            curso: "Data Structures",
            estudiante: "Jesus",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            estudiante: "Jose",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            estudiante: "Juan",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            estudiante: "Aloso",
            fecha_registro: "01/03/2022",
        }, {
            curso: "Data Structures",
            estudiante: "Mateo",
            fecha_registro: "01/03/2022",
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
                    <Ionicons name='person-circle-outline' size={80} color='azure' />
                    <View style={styles.container}>
                        <Text style={styles.rowText}>{item.estudiante}</Text>
                        <Text style={{ color: 'white', textAlign: 'justify' }}>
                            {item.curso}
                        </Text>
                        <Text style={{ padding: 5, color: 'white', fontWeight: 'bold', }}>
                            Fecha: {item.fecha_registro}
                        </Text>
                    </View>
                </View>
            )}
        />
    );
}