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
        marginLeft: '13%',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#14467C',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
    form: {
        paddingTop: 40,
        alignItems: 'center'
    },
    input: {
        width: 250,
        padding: 10,
        height: '100%'
    },
    signUpView: {
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonSignIn: {
        backgroundColor: '#14467C',
        padding: 10,
        width: 300,
        borderRadius: 8,
        marginBottom: '20%'
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTologin: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonTextLink: {
        margin: 0
    },
    textLink: {
        fontWeight: 'bold'
    },

    error: {
        fontSize: 12,
        marginBottom: 10,
        paddingTop: '1%',
        color: '#14467C'
    },

    containerCreateAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4%'
    },

    textCreateAccount: {
        color: '#8A8A8A',
        fontSize: 16
    }
});

export default styles;
