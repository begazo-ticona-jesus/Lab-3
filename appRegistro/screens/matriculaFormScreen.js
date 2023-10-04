import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Pressable, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDBConnection, insertAlumnos, verificarDatosEnBD } from '../utils/db';
import Navigation from '../components/commonNavigator';
import { Picker } from '@react-native-picker/picker';

export default function MatriculaForm() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState('');
    const courses = ['Curso 1', 'Curso 2', 'Curso 3'];

    const [matriculado, setMatriculado] = useState({
        nombres: "",
        apellidos: "",
        cui: 0,
        fecha_registro: "",
        curso: "",
    });

    const {
        nombres,
        apellidos,
        cui,
        fecha_registro,
        curso,
    } = matriculado;

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {

                setMatriculado({
                    ...matriculado,
                    fecha_registro: currentDate.toDateString(),
                });
                setShowPicker(false);
            }
        }
        else {
            toggleDatepicker();
        }
    }

    const handledForm = (name, value) => {
        setMatriculado({
            ...matriculado,
            [name]: value,
        });
    };

    async function createAlumno() {
        try {
            const fechaISO = date.toISOString().split('T')[0];
            const db = await getDBConnection();
            await insertAlumnos(db, nombres, apellidos, cui, fechaISO, curso);
            Alert.alert(
                'Success',
                'Matricula Realizada Correctamente',
                [
                    {
                        text: 'OK'
                    }
                ]
            ),
            {
                cancelable: false
            };
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Text>Formulario de Matrícula</Text>
            <TextInput
                placeholder="Nombres"
                value={nombres}
                onChangeText={(text) => handledForm("nombres", text)}
            />
            <TextInput
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={(text) => handledForm("apellidos", text)}
            />
            <TextInput
                placeholder="CUI"
                keyboardType="numeric"
                value={cui.toString()}
                onChangeText={(text) => handledForm("cui", parseInt(text, 10))}
            />
            <Picker
                selectedValue={selectedCourse}
                onValueChange={
                    (itemValue) => {
                        setSelectedCourse(itemValue);
                        handledForm('curso', itemValue);
                    }
                }
                >
                <Picker.Item label="Selecciona un curso" value="" />
                {courses.map((course, index) => (
                    <Picker.Item key={index} label={course} value={course} />
                ))}
            </Picker>
            <View style={{ flexDirection: 'row' }}>
                <Text>Fecha de registro: </Text>
                {showPicker && (
                    <DateTimePicker
                        mode='date'
                        display='spinner'
                        value={date}
                        onChange={onChange}
                    />
                )}
                <Pressable onPress={toggleDatepicker}>
                    <TextInput
                        placeholder="dd/mm/aa"
                        value={fecha_registro}
                        onChangeText={(text) => handledForm("fecha_registro", text)}
                        editable={false}
                    />
                </Pressable>

            </View>
            <Button title="Registrar Matrícula" onPress={createAlumno} />
        </View>
    );
}