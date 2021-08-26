import react from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    subtitle: {
        marginTop: 40,
        marginLeft: 25,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 32,
        color: '#14467C'
    },
    impactWords: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight: 50,
        marginTop: 40
    },
    buttonEnter: {
        marginTop: 70,
        backgroundColor: '#14467C',
        width: 300,
        padding: 10,
        borderRadius: 8
    },
    textButtonEnter: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 18
    },
    buttonSignIn: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        width: 300,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#14467C'
    },
    textSignIn: {
        color: '#14467C',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default styles;
