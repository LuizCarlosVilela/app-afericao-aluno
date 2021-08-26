import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

//Libraries
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

//Assets
import faceId from '../../assets/images/face-id.png';
import check from '../../assets/images/check.jpg';

//Interface
interface PropsValidation {
  onPress: (value: any) => void;
}

const ValidationForm: React.FC<PropsValidation> = ({ onPress }) => {
  const [image, setImage] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCamImage = async () => {
    if (Constants.platform?.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!status) {
        alert('Precisamos dessa permissão!');
        setVisible(false);
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.6,
    });

    if (!result.cancelled) {
      setImage(result);
      onPress(result);
      setVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Clique na imagem abaixo para registrar o seu reconhecimento facial
      </Text>
      <View style={styles.containerImage}>
        {image === null ? (
          <>
            <TouchableOpacity onPress={() => getCamImage()}>
              <Image
                source={faceId}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Text style={styles.subtitle}>Imagem salva com sucesso!</Text>
            <TouchableOpacity onPress={() => getCamImage()}>
              <Image source={check} resizeMode="cover" style={[styles.image]} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ValidationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14467C',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: '2%',
    textAlign: 'center',
  },
  containerImage: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
  },
});
