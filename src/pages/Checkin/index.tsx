import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

//Libraries
import { MaterialIcons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import * as Location from 'expo-location';

//Utils
import {
  uploadImageOnS3,
  uploadImageOnRekognition,
  comparebleImages,
} from '@utils/services';
import api from '@utils/api';

//States
import { useAuth } from '@states/auth';

//Styles
import styles from './styles';

//Assets
import iconSMTT from '@assets/images/iconIdoso.png';
import check from '../../assets/images/check.jpg';

//Components
import ScanFaceUser from '@components/ScanFaceUser';
import Map from '@components/Map';
import ScanCarUser from '@components/ScanCarUser';
import PlateCar from '@components/PlateCar';
import Button from '@components/Button';
import Scan from '@components/Scan';
import CheckFace from '@components/CheckFace';

//Interfaces
interface WalletProps {
  id: string;
  name_user: string;
  number_registration: string;
  date_emission: string;
  unity_federation: string;
  city: string;
  agency: string;
  status: string;
  date_validate: string;
  user_id: string;
}

interface WalletIdosoProps {
  wallet: WalletProps | undefined;
}

interface LocationProps {
  latitude: number;
  longitude: number;
}

export default function Checkin() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const pagerRef = useRef(null);
  const { auth } = useAuth();
  const { user } = auth;
  console.log('placa numero:', plateNumber);
  const [address, setAddress] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [location, setLocation] = useState<LocationProps>();
  const [carImage, setCarImage] = useState();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleGetAddress(value: any) {
    const { latitude, longitude } = value;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    for (let item of response) {
      let address = `${item.street}, nº ${item.name}, ${
        item.city !== null ? item.city + '-' : ''
      } ${item.region} `;
      setAddress(address);
    }
  }

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current.setPage(pageNumber);
  };

  function handleGetDate() {
    const date = new Date();

    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let segunds = date.getSeconds();

    return `${day}/${month}/${year} - ${hours}:${minutes}:${segunds}`;
  }

  const handleSubmitData = async () => {
    setLoading(true);
    handlePageChange(6);

    let url_car;
    if (carImage == null) {
      url_car = '';
    } else {
      url_car = await uploadImageOnS3(carImage);
    }

    try {
      let response;

      const newCheckin = {
        user_url: '',
        user_latitude: location?.latitude,
        user_longitude: location?.longitude,
        place_car: plateNumber,
        url_car,
        date_check: handleGetDate(),
        adress_check: address,
        user_id: user?.id,
      };
      console.log(newCheckin);
      response = await api.post('/check/create', newCheckin);
      alert('Informações enviadas com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Ocorreu alguma falha, tente novamente!');
    } finally {
      setDone(true);
      setLoading(false);
    }
  };

  function handleFinishCheckin() {
    console.log('placa carro:',plateNumber)
    setCarImage(null);
    setPlateNumber('');
    handlePageChange(0);
    console.log('placa carro:',plateNumber)
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="menu" color="#FFF" size={35} />
          </TouchableOpacity>
          <Image source={iconSMTT} />
        </View>
      </View>
      <View style={{ backgroundColor: '#14467C', marginTop: -20 }}>
        <View style={{ marginLeft: 50 }}>
          <Text style={styles.headerText}>{`Olá, ${user?.name}`}</Text>
        </View>
      </View>

      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={false}
      >
        <View key="1" style={styles.pagerContainer}>
          <CheckFace
            onPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2" style={{ flex: 1 }}>
          <Map
            onPress={(value: any) => {
              setLocation(value);
              handleGetAddress(value);
              handlePageChange(2);
            }}
          />
        </View>
        <View
          key="3"
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <PlateCar
            onPress={(value: any) => {
              setPlateNumber(value);
              console.log('valor placa carro:', value)
            }}
            handleSubmit={() => {
              handlePageChange(3);
            }}
            value={plateNumber}
          />
          <Button title="Voltar" onPress={() => handlePageChange(1)} />
        </View>
        <View key="4">
          <Scan
            title="Selecione ou tire uma foto do seu Carro"
            onPress={(value: any) => {
              setCarImage(value);
            }}
            img={carImage}
            done={done}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button title="Voltar" onPress={() => handlePageChange(2)} />
            <Button
              title="Continuar"
              onPress={() => handlePageChange(4)}
              disabled={!carImage}
            />
          </View>
        </View>
        <View key="5">
          <Text
            style={[styles.title, { textAlign: 'center', marginBottom: 0 }]}
          >
            Confirmação de dados
          </Text>
          <View style={{ flex: 1, backgroundColor: '#f3f3f3', margin: '5%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ padding: '10%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.subtitle}>Endereço: </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                  >
                    {address}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.subtitle}>Placa do veículo: </Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {plateNumber}
                  </Text>
                </View>

                <Text style={styles.subtitle}>Imagem do carro: </Text>

                <Image
                  resizeMode={'cover'}
                  style={{ width: 300, height: 350, borderRadius: 5 }}
                  source={{ uri: carImage?.uri }}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button title="Voltar" onPress={() => handlePageChange(3)} />
            <Button
              title="Continuar"
              onPress={() => handlePageChange(5)}
              disabled={!carImage}
            />
          </View>
        </View>
        <View
          key="6"
          style={{ justifyContent: 'space-between', paddingHorizontal: '2%' }}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={[styles.title, { textAlign: 'center' }]}>
              Agora é so clicar no botão "Enviar" para salvar o seu check-in!
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button title="Voltar" onPress={() => handlePageChange(4)} />
            <Button title="Enviar" onPress={() => handleSubmitData()} />
          </View>
        </View>
        <View
          key="7"
          style={[styles.pagerContainer, { justifyContent: 'space-around' }]}
        >
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.subtitle}>Enviando dados do check-in...</Text>
              <ActivityIndicator size="large" color="#14467C" />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.title}>Check-in salvo com sucesso!</Text>
              <Image source={check} resizeMode="cover" style={[styles.image]} />
              <Button title=" Tudo bem" onPress={() => handleFinishCheckin()} />
            </View>
          )}
        </View>
      </PagerView>
    </View>
  );
}
