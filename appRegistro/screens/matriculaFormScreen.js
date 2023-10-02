import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MatriculaForm() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [matriculado, setMatriculado] = useState({
        nombres: "",
        apellidos: "",
        cui: 0,
        curso: "",
        regular: false,
        fechaRegistro: "",
    });

    const {
        nombres,
        apellidos,
        cui,
        curso,
        regular,
        fechaRegistro,
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
                    fechaRegistro: currentDate.toDateString(),
                });
                setShowPicker(false);
            }
        }
        else {
            toggleDatepicker();
        }
    }

    const handledForm = (event) => {
        const { name, value } = event.target;
        setMatriculado({
            ...matriculado,
            [name]: value,
        });
    };
    return (
        <View>
            <Text>Formulario de Matrícula</Text>
            <TextInput
                placeholder="Nombres"
                value={nombres}
                onChangeText={handledForm}
            />
            <TextInput
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={handledForm}
            />
            <TextInput
                name="fecha_registro"
                placeholder="CUI"
                keyboardType="numeric"
                value={cui}
                onChangeText={handledForm}
            />
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
                        value={fechaRegistro}
                        onChangeText={handledForm}
                        editable={false}
                    />
                </Pressable>

            </View>
            <Button title="Registrar Matrícula" onPress={() => { }} />
        </View>
    );
}