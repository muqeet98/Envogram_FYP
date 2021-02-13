import React, { Component } from 'react';
import {AsyncStorage, Text,View, Image, Vibration} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../res/colors';
import images from '../../res/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import DirectMessageSearch from './DirectMessageSearch';
import Title from './Title';
import axios from 'axios';
import {allusers, Messageslist, urlMessages, Messages, base_url} from '../../API/types'
import MessageListItem from './MessageListItem';
import {Actions} from 'react-native-router-flux'


export default class MessagesList extends Component {
  constructor(){
    super();
    this.state ={
        token:'',
        token_type:'',
        id:'',
        dataSource: [],
    }
  }
  UNSAFE_componentWillMount(){
    this.getToken();
  }
  getToken = async() =>{
      this.setState({token: await AsyncStorage.getItem('token')})
      this.setState({token_type: await AsyncStorage.getItem('token_type')})
      this.setState({id: await AsyncStorage.getItem('id')})
      this.getMessages()
  }

  getMessages(){
  console.log("hai data    fgg");
    axios({
      method: 'get',
      url: base_url+ '/api/user/UserList',
      headers: {
        'Authorization':this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        
       let temp= res.data;
        if(temp != null ){
          console.log(res.data)
          this.setState({
            dataSource: temp
          })
          console.log("", this.state.dataSource)
        }
        else{
          console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })

    // fetch(allusers, {
    //   method: "get",
    //   headers: {
    //     'Authorization':this.state.token_type+' '+this.state.token,
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    // }).then(res => res.json())
    //   .then(data => {
    //     console.log("Hai Data",data.data)
    //     // this.setState({
    //     //   dataSource: data.data
        
    //     // })
    //     console.log('Data hai' + this.state.dataSource)
    //   })

  }


 MessageListItem = ({item}) => {
  //  let navigation = this.props;
  //  if(item.to == this.state.id){
    return (
      // <TouchableOpacity onPress = {()=>Actions.Chat({text:item.text,from:item.from_user.name,to:item.from,token_type:this.state.token_type,token:this.state.token})} >
        <TouchableOpacity onPress = {()=>Actions.Chat({ text: item.email,name:item.name,to:item.id,token_type:this.state.token_type,token:this.state.token, id: this.state.id})} >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginStart: 10,
            marginEnd: 10,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
          <Image source={{ uri: 'data:image/jpeg;base64,' + item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            <View style={{flexDirection: 'column', marginStart: 15}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}  >
                {item.name}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.textFaded2}}>{item.email}</Text>
              </View>
            </View>
          </View>
  
          {/* <TouchableOpacity>
            <View>
            <Icon
                style={{width:25, height:25, marginTop: 10}}
                name='camera'
                type='simple-line-icon'
                color='black' />
            </View>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  // }
  // else{
  //   <Text style = {{fontSize:18, alignSelf:'center'}} >No Messages</Text>
  // }
 }




  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this.MessageListItem}
        keyExtractor={item => item.id}
      />
    ); 
  }
}
