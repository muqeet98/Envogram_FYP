import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ToastAndroid, AsyncStorage } from 'react-native';
import {Button} from 'react-native-elements';
import Logo from './logo';
import {url} from '../API/types'
import { Actions } from 'react-native-router-flux'
import { render } from 'react-dom';
import SignUp from './SignUp';
import axios from 'axios';
import { Toast } from 'native-base';
export default class SignUp2 extends SignUp {
  constructor(){
    super();
    this.state ={
      email:'',
      username:'',
      password: '',
      password_confirmation:'',
      
    }
    // console.log("data hai", this.props.data)
  }

submit(data){
  console.log(data);
  if (this.state.email != '' && this.state.username != '' && this.state.password != ''
  && this.state.password_confirmation != ''){
    if(this.state.password == this.state.password_confirmation){
        let collection = {};
        console.log(this.props.data);
        collection = this.props.data;
        collection.email = this.state.email;
        collection.username = this.state.username;
        collection.password = this.state.password;
        collection.password_confirmation = this.state.password_confirmation;
        this.register(collection);
        
    }
    else {
      ToastAndroid.show("Password and ConfirmPassword must be same.",ToastAndroid.SHORT);
    }
  }

  else if(this.state.email == ''){
    ToastAndroid.show("Please Enter Email",ToastAndroid.SHORT);
  }
  else if(this.state.username == ''){
    ToastAndroid.show("Please Enter Username",ToastAndroid.SHORT);
  }
  else if(this.state.password == ''){
    ToastAndroid.show("Please Enter Password",ToastAndroid.SHORT);
  }
  else if(this.state.password_confirmation == ''){
    ToastAndroid.show("Please Confirm Password",ToastAndroid.SHORT);
  }

  else{
    ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
  }
}




register(data){
  console.log(data);
  axios({
    method: 'post',
    url: url +'register',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data
  })
    .then(res => {
     let temp=JSON.stringify(res.data);
      if(temp.includes('User created Successfully')){
        alert("Account Activation Pending\nYou will be able to login to your account once your account is activated.\nThankyou")
        Actions.Login();
      }
      else{
        ToastAndroid.show(res.data,ToastAndroid.SHORT);
      }
    })
    .catch(err => {
      let check = JSON.stringify(err);
      if(check.includes("status code 422")){
        ToastAndroid.show("Inputfields are not Correct",ToastAndroid.SHORT);
      }
      else if(check.includes("Username must be multiple words")){
          ToastAndroid.show("Username must be multiple words",ToastAndroid.SHORT);
      }
      else if(check.includes("status code 500")){
        ToastAndroid.show("Cannot connect to server",ToastAndroid.SHORT);
      }
      console.log(err);
    })
}

  render(){
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        
    <View style={styles.container}>
    <View
          style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    marginTop: 100
                                        
            }}>
                  <Logo/>
        </View>
      
      <View style ={styles.wrapper}>
   
      <Text style={styles.primaryfont}>Register</Text>
        <Text style={styles.secondaryfont}>Form# 02</Text>
        <TextInput style={styles.loginFormTextInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email ID"
        placeholderTextColor="grey"
        onChangeText = {(text) => this.setState({email:text})}
        />
        <TextInput style={styles.loginFormTextInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Username"
        placeholderTextColor="grey"
        onChangeText = {(text) => this.setState({username:text})}
        />
        <TextInput style={styles.loginFormTextInput}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        autoCapitalize = "none"
        onChangeText = {(text) => this.setState({password:text})}
        />
        <TextInput style={styles.loginFormTextInput}
        placeholder="Confirm Password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        autoCapitalize = "none"
        onChangeText = {(text) => this.setState({password_confirmation:text})}
        />
        <Button
          onPress={()=>{this.submit()}}                    
          buttonStyle={[styles.loginButton]}
          title="Register"/>
      <Text style={styles.alreadyLoginText}>Already have an account? Login</Text>
                     
      </View>
      
      <StatusBar style="dark" />
      
    </View>
    </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    position:"relative",
    height: 500,
    width: 320,
    borderRadius: 20,
    
    
  },
  primaryfont:{
    fontSize: 35,
    textAlign: "center"
  },
  secondaryfont:{
    fontSize: 15,
    textAlign: "center",
    marginBottom: 25
  },
  loginFormTextInput : {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 0,
},
loginButton : {
  backgroundColor: '#737373',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  marginLeft: 15,
  marginRight: 15
},
alreadyLoginText : {
  marginTop: 20,
  color: '#000',
  width: '100%',
  textAlign: 'center'
},
});
