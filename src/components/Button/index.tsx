import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

//Interfaces
interface ButtonProps{
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function Button({title, disabled, onPress} : ButtonProps){
  return(
    <View style={styles.container}>

    <TouchableOpacity 
      activeOpacity={disabled ? 1 : 0.3}
      style={[
        styles.button, 
        disabled ? {backgroundColor: '#ccc',} : {}
      ]}
      onPress={() => {
        if(disabled){
          return;
        }
        onPress()
      }}
      >
        <Text style={styles.text}>
          {title}
        </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: '10%',
    marginVertical: '5%',
  },
  button:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#14467C", 
    padding: 10 , 
    borderRadius: 5 ,
  },
  text: {
    fontWeight: '500', 
    marginRight: '5%', 
    fontSize: 17, 
    color: "#fff"
  }
})