import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    contentHeader: {
        backgroundColor: '#14467C',
        width,
        height: height * (15 / 100),
        paddingHorizontal: 20
    },
    headerRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default styles;
