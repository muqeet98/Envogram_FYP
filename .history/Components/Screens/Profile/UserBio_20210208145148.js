import React, { Component } from 'react';
import {View, Text, Image, StyleSheet,AsyncStorage,ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'
import axios from 'axios';
import {urlProfile} from '../../API/types'
import { Actions } from 'react-native-router-flux'
export default class UserBio extends Component {

  constructor(){
    super();
    this.state= {
      name:'',
      username:'',
      school:'',
      token:'',
      token_type:'',
      photo:'',

    }  
  
  }
  UNSAFE_componentWillMount(){
    this.getToken();
  }
  getToken = async() =>{
    this.setState({token: await AsyncStorage.getItem('token')})
    this.setState({token_type: await AsyncStorage.getItem('token_type')})
    this.getProfile();
  }
  getProfile(){
    if(this.state.token !='' && this.state.token_type !=''){
    axios({
      method: 'get',
      url: urlProfile+'profile',
      headers: {
        'Authorization':this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
       console.log(res);
          this.setState({name: res.data.name})
          this.setState({username: res.data.username})
          this.setState({school: res.data.school})
          this.setState({photo: res.data.photo})
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

 
  



  render(){
  return (
    <View
      style={{
        flex: 1,
        flexDirection:"row"
      }}>
         <TouchableOpacity>
        <Image
          source={{uri: this.state.photo}}
          style={{height: 80,
            width: 80,
            borderRadius: 100,
            marginLeft: 20}}
        />
      </TouchableOpacity>
      <View style={{flexDirection:"column", marginTop:5}} >
      <View style={{marginBottom: 5, marginStart:10}}>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize:18}}>{this.state.name}</Text>
        <Text style={{color: '#000'}}>
          {this.state.school}
        </Text>
          <Text style={{color:"#4c98cf"}} >{this.state.username}</Text>
      </View>    
      </View>
      
      
            <Button
          onPress={()=>Actions.EditProfile()}                
          buttonStyle={[styles.loginButton]}
          title="Edit"/>
        
      
    </View>
   );
  }
}
const styles = StyleSheet.create({
  loginButton : {
    backgroundColor: '#4c98cf',
    borderRadius: 6,
    height: 37,
    width: 61,
    marginTop: 20,
    marginStart: 50,
    alignSelf:'flex-end',
  }
})