import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@states/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInputMask } from 'react-native-masked-text';

interface PropsValidation {
  onPress: (value: PropsForm) => void;
  data?: PropsForm;
}
interface PropsForm {
  name: string;
  cpf: string;
  rg: string;
  adress: string;
}

const ValidationForm: React.FC<PropsValidation> = ({ onPress, data}) => {
  const { auth } = useAuth();
  const { user } = auth;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().min(14, () => `Preencha todos os dígitos do seu CPF` ).required('CPF é obrigatório'),
    rg: Yup.string().min(9, () => `Preencha todos dígitos do seu RG`).required('RG é obrigatório'),
    adress: Yup.string().required('Endereço é obrigatório'),
  });

  const [loading, setLoading] = useState(false);

  const handleCarteira = async (values: any) => {
    setLoading(true);

    try {
      const newCarteira = {
        name: values.name,
        cpf: values.cpf,
        rg: values.rg,
        adress: values.adress,
      };
      //response = await api.post('/wallet/create', newCarteira);
      onPress(newCarteira);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            styles.titleBody,
            {
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              marginTop: '5%',
            },
          ]}
        >
          Dados de Preenchimento
        </Text>

        <Formik
          initialValues={{
            name: data?.name || '',
            cpf: data?.cpf || '',
            rg: data?.rg || '',
            adress: data?.adress || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCarteira}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            isValid,
          }) => (
            <View style={{ marginTop: '5%' }}>
              <TextInput
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Informe o seu Nome completo"
                style={styles.inputLogin}
              />
              {errors.name ? (
                <Text style={styles.textInputError}>{errors.name}</Text>
              ) : (
                <></>
              )}
              <TextInputMask
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                placeholder="Informe o seu CPF completo"
                style={styles.inputLogin}
                type="cpf"
              />
              {errors.cpf ? (
                <Text style={styles.textInputError}>{errors.cpf}</Text>
              ) : (
                <></>
              )}

              <View style={[styles.inputView, { padding: 0 }]}>
                <TextInputMask
                  value={values.rg}
                  onChangeText={handleChange('rg')}
                  onBlur={handleBlur('Número do RG')}
                  placeholder="Número do RG"
                  style={styles.input}
                  type={'custom'}
                  options={{
                    mask: '9999999-9',
                  }}
                />
              </View>
              {errors.rg ? (
                <Text style={styles.textInputError}>{errors.rg}</Text>
              ) : (
                <></>
              )}

              <View style={[styles.inputView, { padding: 0 }]}>
                <TextInput
                  value={values.adress}
                  onChangeText={handleChange('adress')}
                  onBlur={handleBlur('Endereço')}
                  placeholder="Endereço"
                  style={styles.input}
                />
              </View>
              {errors.adress ? (
                <Text style={styles.textInputError}>{errors.adress}</Text>
              ) : (
                <></>
              )}

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
                  <Text style={styles.textButton}>Continuar</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ValidationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: '10%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14467C',
    marginTop: '5%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: '2%',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#14467C',
    padding: 10,
    width: 300,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  body: {
    padding: 25,
  },
  titleBody: {
    fontSize: 20,
    fontWeight: '500',
    color: '#14467C',
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#A8A8A8',
    borderWidth: 2,
    borderRadius: 5,
    width: 300,
    marginVertical: 5,
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
  textInputError: {
    color: '#14467C',
    marginVertical: 1,
    alignItems: 'flex-start',
  },
  inputLogin: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#A8A8A8',
    borderWidth: 2,
    borderRadius: 5,
    width: 300,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: '#14467C',
  },
});
