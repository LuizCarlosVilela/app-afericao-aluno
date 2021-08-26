import React,{ useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Header from '@components/Header';
import styles from './styles';


import { Formik } from 'formik';
import * as Yup from 'yup';


export default function Vehicle() {


    const [active, setActive] = useState(false);
    const [placa, setPlaca] = useState('');
    const [renavam, setRenavam] = useState('');


    function handleRegisterVehicle(placa, renavam){
        setPlaca(placa);
        setRenavam(renavam);
        setActive(true);
        alert('Veículo cadastrado com sucesso!')
    }

    const validationSchema = Yup.object().shape({
        placa: Yup.string().required('Número da placa é obrigatório'),
        renavam: Yup.string().required('Número do Renavam é obrigatório'),
    });

    if(!active){    
        return (
            <View style={[styles.container,{alignItems: 'center'}]}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false} >

                    <Text style={[styles.titleBody, {fontWeight: 'bold', fontSize: 25, textAlign: 'center', marginTop: '5%'}]}>Cadastrar  Veículo</Text>

                    <Formik

                        initialValues={{
                            placa: '',
                            renavam: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => handleRegisterVehicle(values.placa, values.renavam)}
                        >
                        
                        {({ values, handleChange, handleBlur, handleSubmit, errors, isValid }) => (
                            <View style={{marginTop: '5%', }}>
                            
                                <View style={[styles.inputView, { padding: 0 }]}>
                                    <TextInput
                                        value={values.placa}
                                        onChangeText={handleChange('placa')}
                                        onBlur={handleBlur('Número da Placa do Veiculo')}
                                        placeholder="Número da Placa do Veiculo"
                                        style={styles.input}
                                    />
                                </View>
                                {errors.placa ? <Text style={styles.textInputError}>{errors.placa}</Text> : <></>}
                                <View style={[styles.inputView, { padding: 0 }]}>
                                    <TextInput
                                        value={values.renavam}
                                        onChangeText={handleChange('renavam')}
                                        onBlur={handleBlur('renavam')}
                                        placeholder="Número do Renavam"
                                        style={styles.input}
                                    />
                                </View>
                                {errors.renavam ? <Text style={styles.textInputError}>{errors.renavam}</Text> : <></>}
                                
                                <TouchableOpacity
                                        disabled={!isValid}
                                        style={[styles.buttonEnter, !isValid ? { backgroundColor: '#ccc' } : {}]}
                                        onPress={() => handleSubmit()}>
                                        <Text style={styles.textButton}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
                
                </View>
            );
        }


        return(
            <View style={[styles.container,{alignItems: 'center'}]}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false} >

                   <Text>Meu veículo</Text>
                   <Text>{`Placa de veiculo: ${placa}`}</Text>
                   <Text>{`Renavam:  ${renavam}`}</Text>
                </ScrollView>
                
                </View>
        );
    }

