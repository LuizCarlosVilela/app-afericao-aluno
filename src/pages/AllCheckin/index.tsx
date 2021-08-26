import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';

//Libraries
import { MaterialIcons } from '@expo/vector-icons';

//States
import { useAuth } from '@states/auth';

//Assets
import iconSMTT from '@assets/images/iconIdoso.png';

//Styles
import styles from './styles';
import api from '@utils/api';

export default function AllCheckin() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const { auth } = useAuth();
  const { user } = auth;
  const [updateCheckins, setUpdateCheckins] = useState(false);
  const [checkins, setCheckins] = useState();

  async function handleGetAllCheckin() {
    const date = await api.get('/check/user', {
      params: { user_id: user?.id },
    });
    console.log(date.check);
    setCheckins(date.check);
  }

  useEffect(() => {
    handleGetAllCheckin();

    setTimeout(() => {
      setUpdateCheckins(!updateCheckins);
    }, 1000);
  }, [updateCheckins]);

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

      <View style={{ margin: '5%', flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={checkins}
            renderItem={({ item }) => (
              <Card
                style={{ backgroundColor: '#f7f7f7', marginVertical: '4%' }}
              >
                <Card.Title
                  title="Dados do Check-in Realizado"
                  left={() => (
                    <List.Icon color="blue" icon="map-marker-check" />
                  )}
                />

                <Card.Content>
                  <View>
                    <Title style={{ fontWeight: 'bold', fontSize: 15 }}>
                      Placa do Carro:
                    </Title>
                    <Paragraph style={{ fontSize: 15 }}>
                      {item.place_car}
                    </Paragraph>
                  </View>

                  <View>
                    <Title style={{ fontWeight: 'bold', fontSize: 15 }}>
                      Data/Hora do Check-in:
                    </Title>
                    <Paragraph style={{ fontSize: 15 }}>
                      {item.date_check}
                    </Paragraph>
                  </View>

                  <View>
                    <Title style={{ fontWeight: 'bold', fontSize: 15 }}>
                      Endereço que o Check-in foi realizado:
                    </Title>
                    <Paragraph style={{ fontSize: 15 }}>
                      {item.adress_check}
                    </Paragraph>
                  </View>
                </Card.Content>
              </Card>
            )}
          />
      </View>
    </View>
  );
}
