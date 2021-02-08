import React, { useEffect, useState,Component } from 'react';
import {Text,AsyncStorage,View,TouchableOpacity,Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { acceptChatReq, deleteChatReq, sendRequest } from '../../API/types';
import axios from 'axios';
import { Icon } from 'react-native-elements'
import RequestListItem from './RequestListItem';
import { Actions } from 'react-native-gifted-chat';


export default class MessagesList extends Component{
// export default function MessagesList() {

  constructor(){
    super();
    this.state ={
      dataArr: [],
      token: '',
      token_type: ''
    }
  }
  renderItemsFun = ({item,index}) => {
    return(
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginStart: 10,
      marginEnd: 10,
      marginTop: 15,
    }}>
      
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
      <Image
        source={{uri: 'https://picsum.photos/600'}}
        style={{width: 60, height: 60, borderRadius: 70}}
      />
      </TouchableOpacity>
      <View style={{flexDirection: 'column', marginStart: 15, marginTop: 20}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           
        </View>
      </View>
    </View>
  
    
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={() =>  
         axios({
      method: 'get',
      url: acceptChatReq + item.id,
      headers: {
        Authorization: this.state.token_type + ' ' + this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          dataArr: this.state.dataArr.splice(index, 1) 
        })
        // let temp = JSON.stringify(res.data);
        
      })
      .catch(err => {
        console.log(err);
      }) }
      >

      <View>
      <Icon
          style={{width:25, height:25, marginTop: 20, marginEnd: 20}}
          name='check-circle'
          type='material-community'
          color='green' />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  
         axios({
       method: 'DELETE',
      url: deleteChatReq + item.id,
      headers: {
        Authorization: this.state.token_type + ' ' + this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        console.log(res.data)
        // let temp = JSON.stringify(res.data);
        // this.state.dataArr.splice(index, 1) 
        this.setState({
            dataArr: this.state.dataArr.splice(index, 1) 
          })
        // this.state.dataArr.splice(index, 1)
      })
      .catch(err => {
        console.log(err);
      }) }
      
      >
      <View>
      <Icon
          style={{width:25, height:25, marginTop: 20}}
          name='circle-with-cross'
          type='entypo'
          color='red' />
      </View>
      </TouchableOpacity>
      </View>
    
  </View>
    )
  }

  // AcceptReq () => {
  //   axios({
  //     method: 'get',
  //     url: acceptChatReq + ,
  //     headers: {
  //       Authorization: this.state.token_type + ' ' + this.state.token,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //   })
  //     .then(res => {
  //       console.log(res.data)
  //       // let temp = JSON.stringify(res.data);
  //        this.setState({dataArr: res.data})
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  webCall = async () => {

    this.setState({ token: await AsyncStorage.getItem('token')})
    this.setState({ token_type: await AsyncStorage.getItem('token_type')})
    console.log(this.state.token)
  axios({
    method: 'get',
    url: 'https://envogram.softgear.site/api/user/chat-request',
    headers: {
      Authorization: this.state.token_type + ' ' + this.state.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then(res => {
      console.log(res.data)
      // let temp = JSON.stringify(res.data);
       this.setState({dataArr: res.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.webCall()
  }
 
render(){
  return (
    <View>
      {this.state.dataArr != []
      ? 
    <FlatList
      data={this.state.dataArr}
      renderItem={this.renderItemsFun}
    />
    :
    <Text>No Request Found</Text>
      }
    </View>
  );
}
}
