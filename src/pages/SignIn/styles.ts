import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : 30,
        marginVertical: '4%',
        backgroundColor: '#FFF'
    },
    subtitle: {
        marginTop: '5%',
        marginBottom: '5%',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        color: '#000'
    },
    inputLogin: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: 5,
        width: 300,
        marginVertical: 5
    },
    buttonEnter: {
        marginTop: 20,
        backgroundColor: '#14467C',
        padding: 10,
        width: 300,
        borderRadius: 8
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    textToSignIn: {
        marginTop: 10
    },
    textLinkSignIn: {
        fontWeight: 'bold'
    },

    textInputError: {
        color: '#14467C',
        marginVertical: 1
    },
    inputView: {
        padding: 10,
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: 5,
        width: 300,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        width: 250,
        padding: 10,
        height: '100%'
    },

    containerCreateAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '4%'
    },

    textCreateAccount: {
        color: '#8A8A8A',
        fontSize: 16
    }
});

export default styles;
