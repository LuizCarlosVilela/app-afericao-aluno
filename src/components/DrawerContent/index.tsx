import React, { useEffect, useState } from 'react';
import { Drawer, Card, Avatar, Title } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { useAuth } from '@states/auth';
import { Container, Header } from './styles';

import api from '@utils/api';
import { Alert } from 'react-native';

const DrawerContent: React.FC<DrawerContentComponentProps<
  DrawerContentOptions
>> = ({ navigation }) => {
  const { auth, logout } = useAuth();
  const { user } = auth;

  const [status, setStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleStatus = async () => {
    const date = await api.get('/solicitation/status/user', {
      params: { user_id: user?.id },
    });

    setStatus(date?.status);
    //console.log(date?.status);
  };

  useEffect(() => {
    setTimeout(() => {
      ///setUpdateStatus(!updateStatus)
      handleStatus();
    }, 2000);
  }, [status]);

  useEffect(() => {
    handleStatus();
  }, []);

  return (
    <Container>
      <Drawer.Section>
        <Header>
          <Card.Title
            title={auth.user?.email}
            subtitle={auth.user?.email}
            left={(props) => <Avatar.Text {...props} label="S" />}
          />
        </Header>
      </Drawer.Section>
      <Drawer.Section>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <FeatherIcon name="home" color={color} size={size} />
          )}
          onPress={() => navigation.navigate('Home')}
        />

        {status === 'finalizado' ? (
          <>
            <DrawerItem
              label="Check-in Usuário"
              icon={({ color, size }) => (
                <FeatherIcon name="check-square" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Checkin')}
            />
            <DrawerItem
              label="Ver todos check-in"
              icon={({ color, size }) => (
                <FeatherIcon name="check-square" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('AllCheckin')}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Aguarde para fazer check-in..."
              onPress={() =>
                Alert.alert(
                  'Menu',
                  'Aguarde a sua solicitação ser aprovada para poder fazer check-in'
                )
              }
            />
          </>
        )}
      </Drawer.Section>
      <Drawer.Section>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => (
            <FeatherIcon name="log-out" color={color} size={size} />
          )}
          onPress={() => logout()}
        />
      </Drawer.Section>
    </Container>
  );
};

export default DrawerContent;
