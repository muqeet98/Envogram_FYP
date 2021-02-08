import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default function DirectMessageSearch() {
  return (
    
      <View>
      <TouchableOpacity onPress={()=>Actions.Requests()} >
            <Text style={styles.textInput} >Requests</Text>
            </TouchableOpacity>
    </View>
    
  );
}
const styles=StyleSheet.create({
  textInput: {
    marginTop: 10,
    textAlign:"right",
    marginRight:15,
    color:"#4c98cf",
    fontSize:16,
    
    
  },
})