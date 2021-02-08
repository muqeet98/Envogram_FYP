import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, ToastAndroid } from 'react-native';
import {Button} from 'react-native-elements';
import Logo from './logo';
import DropDownPicker from 'react-native-dropdown-picker';
import {Actions} from 'react-native-router-flux'
export default class SignUp extends Component {
  constructor(){
    super();
    this.state ={
      name: '',
      last_name: '',
      father_name: '',
      department:'',
      registration_no:'',
      school:'',
      batch:'',
      isValid: null,
      // fullname: name +' '+last_name
    }
  }
submit(){
  if (this.state.name != '' && this.state.father_name != '' && this.state.registration_no != ''
    && this.state.school != '' && this.state.department != '' && this.state.batch != ''){
      if(this.state.registration_no.length >= 10){
      Actions.SignUp2({data:this.state});
    }
  }
  else if(this.state.name == ''){
    ToastAndroid.show("Please Enter Name",ToastAndroid.SHORT);
  }
  else if(this.state.father_name == ''){
    ToastAndroid.show("Please Enter Father Name",ToastAndroid.SHORT);
  }
  else if(this.state.registration_no == ''){
    ToastAndroid.show("Please Enter number Reg#",ToastAndroid.SHORT);
  }
  else if(this.state.school == ''){
    ToastAndroid.show("Please Select University",ToastAndroid.SHORT);
  }
  else if(this.state.department == ''){
    ToastAndroid.show("Please Select Department",ToastAndroid.SHORT);
  }
  else if(this.state.batch == ''){
    ToastAndroid.show("Please Select Batch",ToastAndroid.SHORT);
  }
    else{
      ToastAndroid.show("Please Fill all the Required Fields",ToastAndroid.SHORT);
    }
}

  render() {
    const { isValid } = this.state;
    console.log('isValid', isValid);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              marginTop: 100

            }}>
            <Logo />
          </View>

          <View style={styles.wrapper}>

            <Text style={styles.primaryfont}>Register</Text>
            <Text style={styles.secondaryfont}>Form# 01</Text>
            <TextInput style={styles.loginFormTextInput}
              autoCapitalize="none"
              placeholder="Full Name (Min. two words)"
              // pattern={[
              //   '^.{8,}$', // min 8 chars
              //   '(?=.*\\d)', // number required
              //   '(?=.*[A-Z])', // uppercase letter
              // ]}
              placeholderTextColor="grey"
              onChangeText = {(text) => this.setState({name:text})}
              //  onValidation={isValid => this.setState({ isValid })}
            />
            <TextInput style={styles.loginFormTextInput}
              autoCapitalize="none"

              placeholder="Father Name (Min. two words"
              placeholderTextColor="grey"
              onChangeText = {(text) => this.setState({father_name:text})}
            />
            <TextInput style={styles.loginFormTextInput}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholder="Registration# (Min. 10 chars)"
              placeholderTextColor="grey"
              maxLength ={10}
              onChangeText = {(text) => this.setState({registration_no:text})}
            />
            <DropDownPicker
              placeholder="School"
              placeholderStyle={{ fontSize: 14, color: 'grey' }}
              dropDownStyle={{ width: 290, marginLeft: 15 }}
              style={[styles.loginFormTextInput, { borderRadius: 10 }]}
              containerStyle={{ height: 48 }}
              itemStyle={{
                justifyContent: 'center'
              }}

              items={[
                { label: 'Select University', value: '' , selected: true },
                { label: 'IIUI', value: 'IIUI' },
                { label: 'NUST', value: 'NUST' },
                { label: 'FAST', value: 'FAST' },
                { label: 'NUML', value: 'NUML' },
                { label: 'Organization', value: 'Organization' }
              ]}
              onChangeItem = {(item) =>this.setState({school:item.value})}

            >

            </DropDownPicker>
            <DropDownPicker


              placeholder="Department"
              placeholderStyle={{ fontSize: 14, color: 'grey' }}
              dropDownStyle={{ width: 290, marginLeft: 15 }}
              style={[styles.loginFormTextInput, { borderRadius: 10 }]}
              containerStyle={{ height: 48 }}
              itemStyle={{
                justifyContent: 'center'
              }}

              items={[
                { label: 'Select Department', value: '', selected: true },
                { label: 'Computer Science and Software Engineering', value: 'Computer Science and Software Engineering' },
                { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
                { label: 'Electrical Engineering', value: 'Electrical Engineering' },
                { label: 'Physics', value: 'Physics' },
                { label: 'Shariah & Law', value: 'Shariah & Law' }
              ]}
              onChangeItem = {(item) =>this.setState({department:item.value})}

            >

            </DropDownPicker>
            <DropDownPicker


              placeholder="Batch"
              placeholderStyle={{ fontSize: 14, color: 'grey' }}
              dropDownStyle={{ width: 290, marginLeft: 15 }}
              style={[styles.loginFormTextInput, { borderRadius: 10 }]}
              containerStyle={{ height: 48 }}
              itemStyle={{
                justifyContent: 'center'
              }}

              items={[
                { label: 'Select Batch', value: '', selected: true },
                { label: 'F-16', value: 'F-16' },
                { label: 'F-17', value: 'F-17' },
                { label: 'F-18', value: 'F-18' },
                { label: 'F-19', value: 'F-19' },
                { label: 'ORG', value: 'ORG' }
              ]}
              onChangeItem = {(item) =>this.setState({batch:item.value})}

            >

            </DropDownPicker>
          {}
            <Button
              onPress={() => this.submit()}
              buttonStyle={[styles.loginButton]}
              title="Next" />


          <View style={{flexDirection:'row', alignSelf:'center'}}>
            <Text style={styles.alreadyLoginText}>Already have an account? </Text> 
            <Text style={styles.alreadyLoginText} onPress={()=> Actions.Login()}>Login</Text>
            </View>
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
    height: 550,
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
    marginBottom: 10
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
  marginRight: 15,
},
alreadyLoginText : {
  marginTop: 10,
  color: '#000',
  
  // textAlign: 'center'
},
});
