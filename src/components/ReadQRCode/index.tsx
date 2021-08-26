import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Image, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '@components/Header';
import QrImage from '@assets/images/ScanQR.png';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const qrSize = width * 0.6;

export default function QRCodeReady() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert('Scaneado com sucesso!');
        //console.log('DATA', data)
        navigation.navigate('WalletQRCode', { wallet_id: data });
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFill, styles.container]}>
                    <Text style={styles.description}>Deixe em Cima do QRCode</Text>
                    <Image style={styles.qr} source={QrImage} />
                    <Button title="Scanear novamente" onPress={() => setScanned(false)} />
                </BarCodeScanner>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: '10%',
    },
    qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize
    },
    description: {
        fontSize: width * 0.09,
        marginTop: '10%',
        textAlign: 'center',
        width: '70%',
        color: 'white'
    },
    cancel: {
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '70%',
        color: 'white'
    }
});
