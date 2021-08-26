/* eslint-disable no-var */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@states/auth';
import api from '@utils/api';
import styles from './styles';

export default function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { height } = Dimensions.get('window');
    const navigation = useNavigation();
    const { login } = useAuth();

    const validationSchema = Yup.object().shape({
        nome_completo: Yup.string().required('Campo Nome é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('Campo Email obrigatório'),
        password: Yup.string()
            .min(8, ({ min }) => `A senha deve conter, no mínimo,  ${min} caracteres`)
            .required('Campo Senha obrigatório'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Senhas diferentes')
            .required('Campo Confirmar Senha obrigatório')
    });

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const keyboardDidShow = () => setKeyboardStatus(true);
    const keyboardDidHide = () => setKeyboardStatus(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        };
    }, []);

    const handleCreateUser = async (values: any) => {
        var response = {
            mensagem: 'Tente novamente! E-mail já cadastrado'
        };

        try {
            setLoading(true);
            const newUser = {
                name: values.nome_completo,
                email: values.email,
                password: values.password
            };

            response = await api.post('/user/create', newUser);

            if(response.mensagem === 'O e-mail já está cadastrado, por favor insira outro email!'){
                values.email = '';
                return;
            }else{

                const responseSignIn = await api.post('/login', {
                    email: values.email,
                    password: values.password
                });
                
                
                if (responseSignIn.mensagem === 'Usuário logado com sucesso!') {
                    login(responseSignIn.token, responseSignIn.user);
                }
            }
        } catch (error) {
            setLoading(false);
        } finally {
            Alert.alert('', response.mensagem, [
                {
                    text: 'OK'
                }
            ]);
            setLoading(false);
        }
    };

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={closeKeyboard}>
                <View>
                    <View>
                        {!keyboardStatus && (
                            <Text style={styles.subtitle}>
                                Após efetuar o cadastro, você poderá ter acesso total ao Aplicativo!
                            </Text>
                        )}
                    </View>
                    <View style={styles.form}>
                        <Formik
                            initialValues={{
                                nome_completo: '',
                                email: '',
                                password: '',
                                confirm_password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => handleCreateUser(values)}>
                            {({ values, handleBlur, handleChange, handleSubmit, errors, isValid }) => (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <TextInput
                                        value={values.nome_completo}
                                        onChangeText={handleChange('nome_completo')}
                                        onBlur={handleBlur('nome_completo')}
                                        placeholder="Nome Completo"
                                        style={styles.inputView}
                                    />
                                    {errors.nome_completo && <Text style={styles.error}>{errors.nome_completo}</Text>}

                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        placeholder="Email"
                                        autoCapitalize="none"
                                        style={styles.inputView}
                                    />
                                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                                    <View style={[styles.inputView, { padding: 0 }]}>
                                        <TextInput
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            placeholder="Senha"
                                            style={styles.input}
                                            secureTextEntry={!passwordVisible}
                                        />
                                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                            <Feather
                                                name={passwordVisible ? 'eye-off' : 'eye'}
                                                size={24}
                                                color="#14467C"
                                                style={{ paddingRight: 10 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : <></>}

                                    <View style={[styles.inputView, { padding: 0 }]}>
                                        <TextInput
                                            value={values.confirm_password}
                                            onChangeText={handleChange('confirm_password')}
                                            onBlur={handleBlur('confirm_password')}
                                            placeholder="Confirmar Senha"
                                            secureTextEntry={!confirmPasswordVisible}
                                            style={styles.input}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                            <Feather
                                                name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                                                size={24}
                                                color="#14467C"
                                                style={{ paddingRight: 10 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.confirm_password && (
                                        <Text style={styles.error}>{errors.confirm_password}</Text>
                                    )}

                                    <View style={styles.containerCreateAccount}>
                                        <Text style={styles.textCreateAccount}>Já possui conta? </Text>

                                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                            <Text
                                                style={[
                                                    styles.textCreateAccount,
                                                    { color: '#14467C', fontWeight: 'bold' }
                                                ]}>
                                                Fazer Login
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {loading ? (
                                        <ActivityIndicator size="small" color="#14467C" />
                                    ) : (
                                        <View style={styles.signUpView}>
                                            <TouchableOpacity
                                                disabled={!isValid}
                                                style={[
                                                    styles.buttonSignIn,
                                                    !isValid ? { backgroundColor: '#ccc' } : {}
                                                ]}
                                                onPress={() => handleSubmit()}>
                                                <Text style={styles.textButton}>Cadastrar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </ScrollView>
                            )}
                        </Formik>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
