import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//Libraries
import { TextInputMask } from 'react-native-masked-text';
import { Formik } from 'formik';
import * as Yup from 'yup';

//Components


//Interfaces
interface PropsValidation {
    onPress: (value: any) => void;
    handleSubmit: () => void;
    value: string;
  }

export default function PlateCar({onPress, handleSubmit, value}: PropsValidation) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dados do seu carro</Text>

                    <View style={{ marginTop: '5%' }}>
                    
                    <View style={[styles.inputView, { padding: 0 }]}>
                        <TextInputMask
                        value={value}
                        onChangeText={value => onPress(value) }
                        placeholder="Número do Placa"
                        style={styles.input}
                        type="custom"
                        options={{
                            mask: 'AAA-SSSS'
                            }}
                        />
                    </View>

                <TouchableOpacity
                  disabled={!value}
                  style={[
                    styles.buttonEnter,
                    !value ? { backgroundColor: '#ccc' } : {},
                  ]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.textButton}>Continuar</Text>
                </TouchableOpacity>

                    
                </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#14467C',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#14467C',
        marginBottom: 20,
    },
    input:{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: 5,
        width: 300,
        marginVertical: 5
    },
    inputView: {
        padding: 10,
        borderRadius: 5,
        width: 300,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInputError: {
        color: '#14467C',
        marginVertical: 1,
        alignItems: 'flex-start',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
      buttonEnter: {
        marginTop: 20,
        backgroundColor: '#14467C',
        padding: 10,
        width: 300,
        borderRadius: 8,
      },
      textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
      },
})