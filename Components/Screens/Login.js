import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {url} from '../API/types'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard,ToastAndroid,AsyncStorage } from 'react-native';
import {Button} from 'react-native-elements';
import Logo from './logo';
import axios from 'axios';
import { Actions } from 'react-native-router-flux'
export default class Login extends Component {
  constructor(){
    super();
    this.state ={
      email:'',
      password:'',
      token:'',
    }
   
  }
UNSAFE_componentWillMount(){
this.retriveData();
}

submit(){
  this.login(this.state)
  if(this.state.email !='' && this.state.password != ''){
    this.login(this.state);
  }
  else if(this.state.email == ''){
    ToastAndroid.show("Enter Email",ToastAndroid.SHORT);
  }
  else if(this.state.password == ''){
    ToastAndroid.show("Enter Password",ToastAndroid.SHORT);
  }
  else{
    ToastAndroid.show("Please fill all the required Feilds",ToastAndroid.SHORT);
  }
}

retriveData = async() =>{
  let temp = {};
  temp.email = await AsyncStorage.getItem('email');
  temp.firstLogin = await AsyncStorage.getItem('firstLogin');
if(temp.firstLogin ==true){
  Actions.CompleteProfile();;
}
  else if(temp.email !=null){
    Actions.Feed();
  }
  else {
    this.forceUpdate();
  }
}
storeData = async(data,firstLogin) =>{
  try{
    AsyncStorage.setItem('name',data.user.name)
    AsyncStorage.setItem('id',JSON.stringify(data.user.id))
    AsyncStorage.setItem('firstLogin',firstLogin)
    AsyncStorage.setItem('father_name',data.user.father_name)
    AsyncStorage.setItem('regNo',data.user.registration_no)
    AsyncStorage.setItem('school',data.user.school)
    AsyncStorage.setItem('department',data.user.department)
    AsyncStorage.setItem('batch',data.user.betch)
    AsyncStorage.setItem('phone_number',data.user.phone_number)
    AsyncStorage.setItem('education',data.user.education)
    AsyncStorage.setItem('work_history',data.user.work_history)
    AsyncStorage.setItem('username',data.user.username)
    AsyncStorage.setItem('email',data.user.email)
    AsyncStorage.setItem('photo',data.user.photo)
    AsyncStorage.setItem('role',data.user.role)
    AsyncStorage.setItem('status',data.user.status)
    AsyncStorage.setItem('token',data.access_token)
    AsyncStorage.setItem('token_type',data.token_type)
  }
catch(err){
  ToastAndroid.show(err,ToastAndroid.SHORT);
}
}

login(data){

  const firstLogin = true;
  axios({
    method: 'post',
    url: url +'login',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data
  })
    .then(res => {
     let temp=JSON.stringify(res.data);

     console.log(temp);
      if(temp.includes('access_token')){
        this.storeData(res.data,firstLogin);
        Actions.Feed();
      }
      else if(temp.includes("Account not Activated")){
        ToastAndroid.show("Account not Activated",ToastAndroid.SHORT);
      }
      else{
        ToastAndroid.show("ERROR",ToastAndroid.SHORT);
      }
    })
    .catch(err => {
      let check = JSON.stringify(err); 
      console.log("Hai", check)
      if(check.includes('status code 401')){
        ToastAndroid.show("Invalid Username/Password", ToastAndroid.SHORT);
      }
      else if(check.includes('status code 500')){
        ToastAndroid.show("Connection Timedout", ToastAndroid.SHORT);
      }
      else if(check.includes('Network Error')){
        ToastAndroid.show("Network Error\nPlease Check Your Internet connection and try again later", ToastAndroid.SHORT);
      }
      else{
        console.log(err);
      }
    })
}


  render(){
    const {navigation} = this.props;
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
        <Text style={styles.primaryfont}>Login</Text>
        <Text style={styles.secondaryfont}>Fill in your details</Text>
        <TextInput style={styles.loginFormTextInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="grey"
        onChangeText = {(text) => this.setState({email:text})}
        />
        <TextInput style={styles.loginFormTextInput}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        onChangeText = {(text) => this.setState({password:text})}
        />
        <Button
          onPress={() => {this.submit()}}                 
          buttonStyle={[styles.loginButton]}
          title="Login"/>
      <Text style={styles.alreadyLoginText}
      onPress = {() => Actions.SignUp()}
      >Don't have an account? Register</Text>                          
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    position:"relative",
    height: 500,
    width: 320,
    borderRadius: 20
  },
  primaryfont:{
    fontSize: 35,
    textAlign: "center"
  },
  secondaryfont:{
    fontSize: 15,
    textAlign: "center",
    marginBottom: 50
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
    marginBottom: 5,
    
},
loginButton : {
  backgroundColor: '#737373',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  marginLeft: 15,
  marginRight: 15,
},
alreadyLoginText : {
  marginTop: 20,
  color: '#000',
  width: '100%',
  textAlign: 'center'
},

});
