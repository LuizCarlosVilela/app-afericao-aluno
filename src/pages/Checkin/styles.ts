import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  pagerContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14467C',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14467C',
    marginBottom: 10,
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
  image: {
    width: 250,
    height: 250,
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
});

export default styles;
