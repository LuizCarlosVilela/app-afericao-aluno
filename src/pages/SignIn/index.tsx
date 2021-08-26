/* eslint-disable no-var */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import api from '@utils/api';
import { useAuth } from '@states/auth';

import logoIdoso from '@assets/images/logoIdoso.png';
import styles from './styles';

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatório'),
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

  const handleLogin = async (values: any) => {
    var mensagem = 'Tente novamente, e-mail ou senha erradas!';

    try {
      setLoading(true);
      const response = await api.post('/login', {
        email: values.email,
        password: values.password,
      });

      mensagem = response.mensagem;

      if (mensagem === 'Usuário logado com sucesso!') {
        login(response.token, response.user);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      Alert.alert('', mensagem, [
        {
          text: 'OK',
        },
      ]);
      setLoading(false);
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
        <View>
          {keyboardStatus ? <></> : <Image source={logoIdoso} />}
          <KeyboardAvoidingView behavior="height">
            <Text style={styles.subtitle}>
              Olá,
              <Text style={[styles.subtitle, { color: '#14467C' }]}>
                {' '}
                Seja Bem vind@!
              </Text>
            </Text>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                isValid,
              }) => (
                <View>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Informe o seu email"
                    autoCapitalize="none"
                    style={styles.inputLogin}
                  />
                  {errors.email ? (
                    <Text style={styles.textInputError}>{errors.email}</Text>
                  ) : (
                    <></>
                  )}

                  <View style={[styles.inputView, { padding: 0 }]}>
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Senha"
                      style={styles.input}
                      secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      <Feather
                        name={passwordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color="#14467C"
                        style={{ paddingRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password ? (
                    <Text style={styles.textInputError}>{errors.password}</Text>
                  ) : (
                    <></>
                  )}

                  <View style={styles.containerCreateAccount}>
                    <Text style={styles.textCreateAccount}>
                      Não possui conta?{' '}
                    </Text>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                    >
                      <Text
                        style={[
                          styles.textCreateAccount,
                          { color: '#14467C', fontWeight: 'bold' },
                        ]}
                      >
                        Cadastre-se
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {loading ? (
                    <ActivityIndicator size="small" color="#14467C" />
                  ) : (
                    <TouchableOpacity
                      disabled={!isValid}
                      style={[
                        styles.buttonEnter,
                        !isValid ? { backgroundColor: '#ccc' } : {},
                      ]}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.textButton}>Fazer Login</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Formik>
            {loading && <ActivityIndicator size="small" color="white" />}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
