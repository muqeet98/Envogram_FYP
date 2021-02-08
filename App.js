import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import AppRouting from './Routing/AppRouting'

global.IP='127.0.0.1:8080';
export class App extends Component {
 
  render() {
    return(
        <View style={{flex:1}} >
        <AppRouting/>
        <StatusBar style="dark" />
        </View>
      
    )
  }
}

export default App



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
