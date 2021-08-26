import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import iconSMTT from '@assets/images/iconIdoso.png';
import styles from './styles';

export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.contentHeader}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
                <Image source={iconSMTT} />
            </View>
        </View>
    );
}
