import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoIdoso from '@assets/images/logoIdoso.png';
import styles from './styles';

export default function Landing() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoIdoso} />
      <Text style={styles.subtitle}>
        Carteira de Acessibilidade Maceió, aproximando você da gente :D
      </Text>

      <TouchableOpacity
        style={styles.buttonEnter}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.textButtonEnter}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSignIn}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.textSignIn}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
