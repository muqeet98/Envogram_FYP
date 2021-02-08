import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, AsyncStorage, unstable_batchedUpdates} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'
import UserProfileScreen from './UserProfileScreen';
import {uId} from './UserProfileScreen';
export default class UserBio extends Component{
  constructor(){
    super();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 50
        }}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://picsum.photos/600' }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 100,
              marginLeft: 20
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", marginTop: 5 }} >
          <View style={{ marginBottom: 5, marginStart: 30 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{this.props.user_name}</Text>
            <Text style={{ color: '#000' }}>
            {this.props.user_school}
        </Text>
          <Text style={{ color: "#4c98cf" }} >{this.props.user_userName}</Text>
          </View>
        </View>


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