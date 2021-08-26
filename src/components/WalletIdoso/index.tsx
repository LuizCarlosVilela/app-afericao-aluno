import React from 'react';
import { View, StyleSheet } from 'react-native';

//Libraries
import PagerView from 'react-native-pager-view';

//Components
import QRCode from '@components/QRCode';
import { CardIdoso, CardIdosoBack } from '@components/CardIdoso';

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

interface WalletIdoso {
    wallet : WalletProps | undefined;
}

export default function WalletIdoso({ wallet }: WalletIdoso) {
    return (
        <View style={styles.container}>
            <PagerView style={{ flex: 1 }} initialPage={0}>
                <View key="1" style={{alignItems: 'center'}}>
                    <CardIdoso 
                    data={wallet}/>
                </View>
                <View key="2">
                    <CardIdosoBack 
                    data={wallet}
                    />
                </View>
                <View key="3">
                    <QRCode data={wallet}/>
                </View>
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        color: 'green',
        position: 'absolute',
        top: 10,
        textAlign: 'center',
    }
});
