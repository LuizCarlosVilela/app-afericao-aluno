import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Avatar, Dialog, Button as Button3 } from 'react-native-paper';

//Libs
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

interface PropsValidation {
  onPress: (value: any) => void;
  img?: string;
}

const ValidationForm: React.FC<PropsValidation> = ({ onPress, img }) => {
  const [image, setImage] = useState<any>(img? {uri: img} : null);
  const [visible, setVisible] = useState(false);
  const [visibleErrorImg, setVisibleErrorImg] = useState(false);

  const getStorageImage = async () => {
    if (Constants.platform?.ios) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (!status) {
        alert('Precisamos dessa permissão!');
        setVisible(false);
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage(result);
      onPress(result);
      setVisible(false);
    }
  };

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
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage(result);
      onPress(result);
      setVisible(false);
    }
  };

  return (
    <>
      <View style={[styles.container, { alignItems: 'center' , justifyContent: 'center' }]}>
        <Text
          style={[
            styles.titleBody,
            {
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              
            },
          ]}
        >
          Selecione ou tire uma foto do seu comprovante de residência
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          {image != null ? (
            <>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Image
                  style={{ width: 300, height: 350, borderRadius: 10 }}
                  source={{ uri: image?.uri }}
                  resizeMode='contain'
                />
                
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#14467C',
                    borderRadius: 10
                  }}
                >
                  Selecione outra imagem
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View
                style={{
                  backgroundColor: '#14467c85',
                  borderRadius: 10,
                  width: 300,
                  height: 350,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button3
                  mode="contained"
                  icon="camera"
                  onPress={() => {
                    getCamImage();
                  }}
                  style={{
                    width: '60%',
                    borderRadius: 20,
                    marginVertical: 10,
                  }}
                >
                  Tirar Foto
                </Button3>
                <Button3
                  mode="contained"
                  icon="file"
                  onPress={() => {
                    getStorageImage();
                  }}
                  style={{
                    width: '60%',
                    borderRadius: 20,
                    marginVertical: 10,
                  }}
                >
                  Procurar
                </Button3>
              </View>
            </>
          )}
        </View>
      </View>
      <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
        <Dialog.Actions style={{ flexDirection: 'column' }}>
          <Button3
            mode="contained"
            icon="camera"
            onPress={() => {
              getCamImage();
            }}
            style={{ width: '60%', borderRadius: 20, marginVertical: 10 }}
          >
            Tirar Foto
          </Button3>
          <Button3
            mode="contained"
            icon="file"
            onPress={() => {
              getStorageImage();
            }}
            style={{ width: '60%', borderRadius: 20, marginVertical: 10 }}
          >
            Procurar
          </Button3>
        </Dialog.Actions>
      </Dialog>
    </>
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
