import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAlumnos, getDBConnection } from '../utils/db';

export default function MatriculaList() {
    const [dataSource, setDataSource] = useState([
        {
            curso: "Data Structures",
            nombres: "Jesus",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            nombres: "Jose",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            nombres: "Juan",
            fecha_registro: "01/03/2022",
        },
        {
            curso: "Data Structures",
            nombres: "Aloso",
            fecha_registro: "01/03/2022",
        }, {
            curso: "Data Structures",
            nombres: "Mateo",
            fecha_registro: "01/03/2022",
        },

    ]);

    //const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await getDBConnection(); // Espera a que se resuelva la promesa
                getAlumnos(
                    db, // Reemplaza 'miTabla' con el nombre de tu tabla
                    (result) => {
                        console.log('Datos obtenidos de la base de datos:', result);
                        setDataSource(result);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    
    
/*
    useEffect(
        function() {
            async function fetchDb(){
                const db = await getDBConnection();
                dataSource = await getAlumnos(db);
                setDataSource(dataSource);
            }
            fetchDb();
        }, []
    );

    function ViewAllAlumnos(){
        
        
    }*/

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
        <View>
            {console.log('Datos en dataSource:', dataSource)}
        
        <FlatList
        
            style={{ marginTop: 10 }}
            data={dataSource}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Ionicons name='person-circle-outline' size={80} color='azure' />
                    <View style={styles.container}>
                        <Text style={styles.rowText}>{item.nombres}</Text>
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
        </View>
    );
}