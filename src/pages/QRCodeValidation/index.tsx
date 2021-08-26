import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logoSMTT from '@assets/images/iconLogo.png';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={logoSMTT} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>
        {`Olá Agente, ${'\n'}valide a carteira do idoso!`}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReadQRCode')}
      >
        <Text style={styles.buttonText}>Validar QRCode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '4%',
    justifyContent: 'space-around'
  },
  image: {
    width: '70%',
    height: '40%',
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#14467C',
    marginBottom: '10%',
    marginHorizontal: '15%',
  },
  button: {
    width: '70%',
    height: '6%',
    backgroundColor: '#14467C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
