import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
// não está ocupando toda a altura da tela, verificar depois

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginVertical: '4%'
    },
    body: {
        padding: 25
    },
    titleBody: {
        fontSize: 20,
        fontWeight: '500',
        color: '#14467C',
        marginBottom: 20
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: 5,
        width: 300,
        marginVertical: 5
    },
    inputView: {
        padding: 10,
        borderRadius: 5,
        width: 300,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
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
    textInputError: {
        color: '#14467C',
        marginVertical: 1,
        alignItems: 'flex-start'
    },
    inputLogin: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: 5,
        width: 300,
        marginVertical: 5
    }
});

export default styles;
