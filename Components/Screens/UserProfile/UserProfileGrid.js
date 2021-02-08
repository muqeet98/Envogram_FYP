import React, { Component } from 'react'
import { View, Text, StyleSheet,  SafeAreaView, AsyncStorage, Image,Dimensions } from 'react-native'
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {userPostAPI} from '../../API/types'
 
export default class UserProfileGrid extends Component {
  constructor(){
    super();
    this.state = {
      token:'',
      token_type:'',
      dataSource:[],
    }
  }
UNSAFE_componentWillMount(){
  this.retriveData();
}
retriveData = async() =>{
  this.setState({token: await AsyncStorage.getItem('token')})
  this.setState({token_type: await AsyncStorage.getItem('token_type')})
  this.getPosts();
}
getPosts(){
  axios({
    method: 'get',
    url: userPostAPI + this.props.id,
    headers: {
        'Authorization' :this.state.token_type+' '+this.state.token ,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then(res => {
     let temp=JSON.stringify(res.data);
        this.setState({
          dataSource: res.data.data
        })
    })
    .catch(err => {
      console.log(err);
    })
}



  renderList = ({item}) => {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ backgroundColor: "#f5f4f9" }}>
        <View style={styles.postContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ left: 65, top: 25 }} >{this.props.user_name}</Text>
          </View>
          <View style={styles.profileContainer} >
            <Image
            source = {(this.props.photo)}
            ></Image>
          </View>
          <View style={styles.innerContainer}>
           <Text style={{ textAlign: "justify",paddingRight:10, paddingLeft: 10 }} >{item.text}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 



  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        style={{ marginTop: 1, marginStart: 1 }}
        renderItem={this.renderList}
        numColumns={1}
        indicatorStyle={"black"}
        showsVerticalScrollIndicator={true}

      />
    )
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