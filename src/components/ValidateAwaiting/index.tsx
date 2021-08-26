/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '@states/auth';
import api from '@utils/api';

interface PropsValidation {
  onPress: () => void;
}

const ValidateAwaitingWallet: React.FC<PropsValidation> = ({ onPress }) => {
  const { auth } = useAuth();
  const { user } = auth;

  // setTimeout(() => {
  //   onPress();
  // }, 5000);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitação em análise</Text>

      <Text style={styles.subtitle}>
        Aguarde, após os nossos agentes analizar sua solicitação, retornaremos a
        resposta por aqui e via email :)
      </Text>
    </View>
  );
};

export default ValidateAwaitingWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around',
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
});
