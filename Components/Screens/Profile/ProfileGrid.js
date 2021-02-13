import React, { Component } from 'react'
import { View, Text, StyleSheet,  SafeAreaView, AsyncStorage, ToastAndroid, Dimensions ,Image} from 'react-native'
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {urlProfile} from '../../API/types';


 
export default class  ProfileGrid extends Component {
  constructor(){
    super();
    this.state ={
      token:'',
      token_type:'',
      name:'',
        dataSource:[],
        photo: ''
    }
  }
  UNSAFE_componentWillMount(){
    this.getToken();

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
          this.setState({photo: 'data:image/png;base64,'+res.data.photo})
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  getToken = async() =>{
    this.setState({name: await AsyncStorage.getItem('name')});
    this.setState({token: await AsyncStorage.getItem('token')});

    this.setState({token_type: await AsyncStorage.getItem('token_type')});
    this.getProfile();
    this.getProfile2();
  }

  getProfile2(){
    if(this.state.token != '' && this.state.token_type!=''){
    axios({
      method: 'get',
      url: urlProfile +'posts',
      headers: {
        'Authorization':this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
        if(temp.includes('data')){
          this.setState({dataSource: res.data.data});
          console.log(res.data);
        }
        else{
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
    else{
      ToastAndroid.show('Token Empty',ToastAndroid.SHORT);
    }
  }
  
  
  renderItem = ({ item }) => {
    console.log("Hello Boy", this.state.photo)
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <View style={{ backgroundColor: "#f5f4f9" }}>
          <View style={styles.postContainer}>
          
            <View style={{ flexDirection: "row" }}>
              <Text style={{ left: 65, top: 25 }} >{this.state.name} </Text>
            </View>
            <Image source={{ uri:  this.state.photo }} style={{ width: 45, height: 45, borderRadius: 30 }} />
            <View style={styles.innerContainer}>
              <Text style={{ textAlign: "justify", paddingLeft: 10 }} >{item.text}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  
  render(){
    return (
        <FlatList
        data={this.state.dataSource}
        style={{marginTop: 1, marginStart: 1}}
        renderItem={this.renderItem}
        numColumns={1}
        indicatorStyle={"black"}
        showsVerticalScrollIndicator={true}
        
      />
    );
  }
}
const styles= StyleSheet.create( {
    profileContainer: {
        width: 39,
        height: 39,
        borderRadius:50,
         backgroundColor:"#000",
        marginLeft: 20,
        top:20,
        position:"absolute"

    },
    postContainer: {
        alignSelf:"center",
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: 175,
        width: Dimensions.get('screen').width-35,
        borderRadius: 20,
        marginTop: 20,
      },
    innerContainer: {
        justifyContent:"center",
        alignSelf:"center",
        flexDirection: 'column',
        backgroundColor: '#f5f4f9',
        position:"absolute",
        height: 100,
        width: Dimensions.get('screen').width-50,
        borderRadius: 20,
        bottom:10
      },
    
})