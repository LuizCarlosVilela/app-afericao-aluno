import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//Libraries
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import iconSMTT from '@assets/images/iconIdoso.png';

//Utils
import api from '@utils/api';

//States
import { useAuth } from '@states/auth';

//Components
import PageViewHome from '@components/PageViewHome';
import WalletIdoso from '@components/WalletIdoso';
import QRCodeValidation from '@pages/QRCodeValidation';
import SolicitationReject from '@components/SolicitationReject';
import ValidateAwaiting from '@components/ValidateAwaiting';

//Styles
import styles from './styles';

//Interfaces
type SolicitationClass = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  adress: string;
  url_rg: string;
  url_rg_verse: string;
  url_cpf: string;
  avatar: string;
  residency: string;
  sickness: string;
  user_id: string;
  status: string;
  mensage_validation: string;
};

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

export default function Home() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { auth, updateWellStatus } = useAuth();
  const { user } = auth;

  const [solicitation, setSolicitation] = useState<SolicitationClass | null>(
    null
  );
  const [wallet, setWallet] = useState<WalletProps>();
  const [updateWallet, setUpdateWallet] = useState(false);

  const [loading, setLoading] = useState(true);

  async function handleGetSolicilitation() {
    const date = await api.get('/solicitation/user', {
      params: { user_id: user?.id },
    });
    if (date?.solicitation) {
      if (date?.solicitation.status === 'finalizado') {
        await handleGetWallet();
      }
      setSolicitation(date?.solicitation);
    }
    setLoading(false);
  }

  async function handleGetWallet() {
    const date = await api.get('/wallet/user', {
      params: { user_id: user?.id },
    });

    if (date?.wallet) {
      setWallet(date?.wallet);
    }
  }

  useEffect(() => {
    handleGetSolicilitation();

    setTimeout(() => {
      setUpdateWallet(!updateWallet);
    }, 3000);
  }, [updateWallet]);

  useFocusEffect(
    useCallback(() => {
      handleGetSolicilitation();
    }, [])
  );

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

      {user?.permissions === 'all' ? (
        <QRCodeValidation />
      ) : (
        <>
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#14467C" />
            </View>
          ) : (
            <>
              {!solicitation?.status && (
                <PageViewHome onPress={() => setUpdateWallet(!updateWallet)} />
              )}
              {solicitation?.status && (
                <>
                  {solicitation?.status === 'validando' && (
                    <ValidateAwaiting onPress={() => console.log('')} />
                  )}
                  {solicitation.status === 'finalizado' && (
                    <WalletIdoso wallet={wallet} />
                  )}
                  {solicitation?.status === 'solicitacao-recusada' && (
                    <SolicitationReject
                      solicitation={solicitation}
                      onPress={() => {
                        console.log('');
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}
