import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons'; // Importamos FontAwesome5

export default function MatriculaForm() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [matriculado, setMatriculado] = useState({
    nombres: '',
    apellidos: '',
    cui: '',
    curso: '',
    regular: false,
    fechaRegistro: '',
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
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        setMatriculado({
          ...matriculado,
          fechaRegistro: formatDate(currentDate), // Formateamos la fecha
        });
        setShowPicker(false);
      }
    } else {
      toggleDatepicker();
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handledForm = (name, value) => {
    setMatriculado({
      ...matriculado,
      [name]: value,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text style={styles.heading}>Formulario de Matrícula</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombres"
              value={nombres}
              onChangeText={(text) => handledForm('nombres', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              value={apellidos}
              onChangeText={(text) => handledForm('apellidos', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="id-card" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CUI"
              keyboardType="numeric"
              value={cui}
              onChangeText={(text) => handledForm('cui', text)}
            />
          </View>
          <View style={styles.dateContainer}>
            <FontAwesome5 name="calendar" style={styles.dateIcon} />
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )}
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.dateInput}
                placeholder="Seleccionar fecha"
                value={fechaRegistro}
                onChangeText={(text) => handledForm('fechaRegistro', text)}
                editable={false}
              />
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Registrar Matrícula</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e90ff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#333333',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333333',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#333333',
  },
  dateInput: {
    flex: 1,
    height: 40,
    color: '#333333',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#87CEEB', // Celeste pastel
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

