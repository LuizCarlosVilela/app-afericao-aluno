import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentHeader: {
    backgroundColor: '#14467C',
    width,
    height: height * (15 / 100),
    paddingHorizontal: 20,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  body: {
    padding: 25,
  },
  titleBody: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14467C',
    marginBottom: 20,
  },
  buttonsRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#14467C',
    padding: 10,
    width: 300,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
