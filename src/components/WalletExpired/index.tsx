import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function WalletExpired() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Carteira Expirada</Text>
            <AntDesign name="close" color="#d80000" size={300} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    text:{
        fontSize: 26,
        fontWeight: 'bold',
        color: 'red',
        position: 'absolute',
        top: 10
    }
});
