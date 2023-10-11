import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllAlumnos } from '../utils/db';

export default function MatriculaList() {
    const [dataSource, setDataSource] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllAlumnos();
                console.log("resultado", result);

                // Mapear los resultados a la estructura deseada
                const formattedData = result.map((row) => ({
                    nombres: row.nombres,
                    apellidos: row.apellidos,
                    cui: row.cui,
                    fecha_registro: row.fecha_registro,
                    curso: row.curso,
                }));

                setDataSource(formattedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const styles = StyleSheet.create({
        row: {
            margin: 10,
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
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
        },
    });

    return (
        <View>
            <FlatList
                style={{ marginTop: 10 }}
                data={dataSource}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Ionicons name="person-circle-outline" size={80} color="azure" />
                        <View style={styles.container}>
                            <Text style={styles.rowText}>{item.nombres}</Text>
                            <Text style={{ color: 'white', textAlign: 'justify' }}>
                                {item.curso}
                            </Text>
                            <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>
                                Fecha: {item.fecha_registro}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
