import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

//Libraries
import { Dialog, Button as Button3 } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

//Interfaces
interface ScanProps {
  title?: string;
  img?: any;
  done?: boolean;
  onPress: (value: any) => void;
}

const Scan: React.FC<ScanProps> = ({ title, img, onPress }) => {
  //const [image, setImage] = useState<any>(img ? { uri: img } : null);
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
      //setImage(result);
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
      //setImage(result);
      onPress(result);
      setVisible(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          {img != null ? (
            <>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Image
                  style={{ width: 300, height: 350, borderRadius: 10 }}
                  source={{ uri: img?.uri }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#14467C',
                    borderRadius: 10,
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

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-around',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  title: {
    color: '#14467C',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
});
