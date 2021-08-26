import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wallet: {
        width: width * 0.9,
        height: height * 0.65,
        borderRadius: 5,
        alignItems: 'center'
    },
    title:{
        backgroundColor: 'black', 
        width: "100%", 
        alignItems: 'center', 
        borderTopEndRadius: 5,
        borderTopStartRadius: 5
    },
    textTitle:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 32
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    items: {
        transform: [{ rotate: '450deg' }],
        height: height * 0.457,
        width: width * 1.02
    },
    image: {
        width: width * 1.02
    },
    line:{
        borderBottomWidth: 2
    },
    text:{
        fontWeight: 'bold', 
        fontSize: 16, 
    },
    containerLogo:{
        flex:1, 
        justifyContent: 'flex-end', 
        alignItems: 'center' 
    },
    logo:{
        height: '50%',
        width: '90%'
    },
    containerInfo:{
        flex: 0.9, 
        flexDirection: 'row', 
        padding: 20, 
        borderBottomWidth: 2 ,
    },
    info:{
        flex: 3 , 
        justifyContent: 'space-around'
    },
    subtitle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 15, 
        marginBottom: '1%'
    },
    containerRules:{
        marginVertical: "3%",
    },
    containerNextCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2%'
    },
    nextCardText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: '1%'
    },
});


export default styles;