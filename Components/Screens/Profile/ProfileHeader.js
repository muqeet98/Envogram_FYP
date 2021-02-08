import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, AsyncStorage,ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {urlProfile} from '../../API/types'
export default class ProfileHeader extends Component {
  constructor(){
    super();
    this.state= {
      followers:'',
      following:'',
      posts:'',
      token:'',
      token_type:'',

    }  
  
  }
  UNSAFE_componentWillMount(){
    this.getToken();
  }

  getProfile(){
    if(this.state.token !='' && this.state.token_type !=''){
    axios({
      method: 'get',
      url: urlProfile+'profile-counts',
      headers: {
        'Authorization':this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
          this.setState({followers: res.data.followers})
          this.setState({following:res.data.following})
          this.setState({posts: res.data.totalPosts})
        
      })
      .catch(err => {
        console.log(err);
            })
    }
  }

  getToken = async() =>{
    this.setState({token: await AsyncStorage.getItem('token')})
    this.setState({token_type: await AsyncStorage.getItem('token_type')})
    this.getProfile();
  }
  
  render(){
  return (
    <View style={Styles.container}>
      <View style={Styles.container2}>
        <View style={Styles.container3}>
          <TouchableOpacity>
  <Text style={Styles.numberContainer}>{this.state.posts}</Text>
            <Text style={Styles.text}>Posts</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
  <Text style={Styles.numberContainer}>{this.state.followers}</Text>
            <Text style={Styles.text}>Followers</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
  <Text style={Styles.numberContainer}>{this.state.following}</Text>
            <Text style={Styles.text}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: '#000',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
