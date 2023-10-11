import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDBConnection, getAllAlumnos, createTables } from '../utils/db';

export default function MatriculaList() {
    const [dataSource, setDataSource] = useState();

    const handleDeleteDatabase = async () => {
        try {
            const db = await getDBConnection();
            // Obtén todos los alumnos antes de eliminar la base de datos
            const alumnos = await getAllAlumnos();
            
            // Elimina la base de datos completa
            db.transaction((tx) => {
                tx.executeSql('DROP TABLE IF EXISTS alumnos', [], () => {
                    console.log('Base de datos eliminada exitosamente');
                    // Luego de eliminar la base de datos, puedes recrear las tablas
                    createTables();
                }, (error) => {
                    console.error('Error al eliminar la base de datos:', error);
                });
            });

            // Ahora puedes hacer algo con los datos de los alumnos si es necesario
            console.log('Datos de alumnos antes de eliminar la base de datos:', alumnos);
        } catch (error) {
            console.error('Error al eliminar la base de datos:', error);
        }
    };


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

    const handleDeleteItem = (cui) => {
        // Filtra los elementos para excluir el que se va a borrar por su cui
        const updatedDataSource = dataSource.filter(item => item.cui !== cui);
        setDataSource(updatedDataSource);
        // Aquí también puedes realizar la lógica para eliminar el elemento de tu base de datos.
    };
    
    return (
    <ScrollView>
        <View style={{ overflowY: 'scroll' }}> 
            {dataSource && dataSource.length > 0 ? (
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
            ) : (
                <Text>No se encontraron elementos.</Text>
            )}
            <Button title="Borrar Base de Datos" onPress={handleDeleteDatabase} />
        </View>
    </ScrollView>

    );
}
