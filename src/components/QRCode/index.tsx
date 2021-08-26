import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '@states/auth';

interface WalletIdosoProps {
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

interface WalletProps{
    data: WalletIdosoProps | undefined;
}


export default function QRCodeComponent({data} : WalletProps) {
    const { auth } = useAuth();
    const { user } = auth;

    const qrdados = `${data?.id}`;

    return (
        <View style={styles.container}>
            <View style={styles.containerNextCard}>
                <QRCode size={300} value={qrdados} />
            </View>
            <View style={styles.containerNextCard}>
                <AntDesign name="arrowleft" size={26} color="black" />
                <Text style={styles.nextCardText}>Arraste para o lado para ver a sua carteira</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrcode: {
        width: '90%',
        height: '90%'
    },
    containerNextCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%'
    },
    nextCardText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: '2%'
    }
});
