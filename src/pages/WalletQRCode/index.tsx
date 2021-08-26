import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Header from '@components/Header';
import { useFocusEffect } from '@react-navigation/native';

import api from '@utils/api';

import styles from './styles';
import WalletIdoso from '@components/WalletIdoso';

interface date {
  mensagem: string;
  wallet: WalletProps;
}

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

export default function Permissionary({ route }: any) {
  const [wallet, setWallet] = useState<WalletProps>();
  const [loading, setLoading] = useState(false);

  const { wallet_id } = route?.params;

  //console.log('WALLET_ID', wallet_id);

  async function getWalletUser() {
    const date = await api.get<date>('/wallet', {
      params: { id: wallet_id },
    });
    setWallet(date.wallet);
    updateValidate(date.wallet);
    setLoading(false);
  }

  async function updateValidate(newWallet: WalletProps) {
    const date_expiration = new Date(newWallet.date_validate);
    const actual_date = new Date();
    if (date_expiration > actual_date) {
      //newWallet.validate = 'false';
      await api.put('/wallet/update', newWallet);
      setWallet(newWallet);
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getWalletUser();
        setLoading(false);
      })();
    }, [wallet_id])
  );

  return (
    <View style={styles.container}>
      <Header />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#14467C" />
        </View>
      ) : (
        <WalletIdoso wallet={wallet} />
      )}
    </View>
  );
}
