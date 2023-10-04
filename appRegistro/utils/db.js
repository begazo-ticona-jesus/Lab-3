import { openDatabase  } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'matriculas.db';

export const getDBConnection = async () => {
    try{
        const db = await openDatabase({name: DATABASE_NAME, location: 'default'});
        return db;
    }
    catch (error) {
        console.error("Error en algun Promesa:", error);
    }
};

export const createTables = async () => {
    // create table if not exists
    const db = await getDBConnection();
    const queryAlumnos = 'CREATE TABLE IF NOT EXISTS alumnos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, apellidos TEXT, cui INTEGER, fecha_registro DATE, curso TEXT)';
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(queryAlumnos);
        });
    } catch (error) {
        console.error("Error al crear la tabla:", error);
    }
};

export async function initDatabase() {
    const db = await getDBConnection();
    await createTables(db);
}

export async function insertAlumnos(db, nombres, apellidos, cui, fecha_registro, curso) {
    const insertQuery = 'INSERT INTO alumnos(nombres, apellidos, cui, fecha_registro, curso) VALUES (?, ?, ?, ?, ?)';
    const values = [nombres, apellidos, cui, fecha_registro, curso];
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(insertQuery, values);
            console.log(values);
        });
        console.log('Inserción exitosa');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    }
}

export const getAlumnos = (db, successCallback, errorCallback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM alumnos',
            [],
            (_, { rows }) => {
                const data = rows._array;
                successCallback(data);
            },
            (error) => {
                errorCallback(error);
            }
        );
    });
};




