import React, { Component } from 'react';
import { AsyncStorage, StyleSheet,Modal,Text,TouchableHighlight, TextInput,Dimensions , ToastAndroid} from 'react-native';
import UserProfileHeader from './UserProfileHeader';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import UserBio from './UserBio';
import UserProfileGrid from './UserProfileGrid'
import axios from 'axios';
import { sendRequest, userProfile } from '../../API/types'
import UserLineSeperator from './UserLineSeperator';

import { Button, Header } from 'react-native-elements'
import { View } from 'react-native-animatable';
import { Textarea } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const data = [{ key: '1' }];
export default class UserProfileScreen extends Component {

  constructor() {
    super();
    this.state = {
      user_id: '',
      token: '',
      token_type: 'Ba',
      user_followers: '',
      user_isfollowing: '',
      user_username: '',
      user_fatherName: '',
      user_school: '',
      user_name: '',
      user_department: '',
      user_photo: '',

      modalVisible: false,
      description: '',
      title:''
    }
  }

  submit(){
    if(this.state.title !='' && this.state.description != ''){
      this.PostData();
      // ToastAndroid.show("Request Sent",ToastAndroid.SHORT);
      // this.setModalVisible(!this.state.modalVisible);
      // this.setState({title: ''});
      // this.setState({description: ''});
    }
    else if(this.state.title == ''){
      ToastAndroid.show("Enter Title",ToastAndroid.SHORT);
    }
    else if(this.state.description == ''){
      ToastAndroid.show("Enter Description",ToastAndroid.SHORT);
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  UNSAFE_componentWillMount() {
    this.retriveData();

  }
  retriveData = async () => {
    this.setState({ token: await AsyncStorage.getItem('token') })
    this.setState({ token_type: await AsyncStorage.getItem('token_type') })
    this.getUser();
  }

  getUser() {
    axios({
      method: 'get',
      url: userProfile + this.props.id,
      headers: {
        'Authorization': this.state.token_type + ' ' + this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
        let temp = JSON.stringify(res.data);
        if (temp.includes('name')) {
          this.setState({
            user_isfollowing: res.data.following,
            user_followers: res.data.followers,
            user_username: res.data.profile.username,
            user_fatherName: res.data.profile.father_name,
            user_school: res.data.profile.school,
            user_name: res.data.profile.name,
            user_department: res.data.profile.department,
            user_photo: res.data.profile.photo,
            user_id: res.data.profile.id

          })
        }

        else {
          console.warn("API RESPONSE EMPTY")
        }
      })
      .catch(err => {
        console.log(err);
      })
  }



  PostData () {

    fetch(base_url+'/api/user/chat-request', {
        method: "post",
        headers: {
            Authorization: this.state.token_type + ' ' + this.state.token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
           
            title: this.state.title,
            body: this.state.description,
            user_id: this.props.id,
            request_user_id: this.state.user_id

        })
    })
        .then(res => res.json())
        .then(data => {
            if (!data.ok) {
                console.log(data)
                ToastAndroid.show("Request Sent",ToastAndroid.SHORT);
                this.setModalVisible(!this.state.modalVisible);
                this.setState({title: ''});
                this.setState({description: ''});
              
            } else {
                console.log("wrong ")
                Alert.alert("Email or password is not correct")
            }
        })
        .catch(error => console.log(error))

}
  
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{flex:1}}>
        <Header
        backgroundColor='#fff'
          placement="left"
          leftComponent={<Icon onPress={() => {
            return (
              console.log("Hai")
            )
          }} style={{ marginRight: 20, color: 'grey' }} name="arrow-left" size={26} color="grey" />}

          centerComponent={{ text: 'User Profile', style: { color: '#000', alignSelf:'center' } }}
          rightComponent={<Icon onPress={() => { this.setModalVisible(true); }}
     style={{ marginRight: 20, color: 'grey' }} name="alert-circle-outline" size={26} color="black" />}

        />

    <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextInput style={styles.loginFormTextInput}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Title"
        placeholderTextColor="grey"
        onChangeText = {(text) => this.setState({title:text})}
        />
            <TextInput style={styles.loginFormTextInput2}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Description (8 to 30 words)"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="grey"
        onChangeText = {(text) => this.setState({description:text})}
        />
            <View style={{flexDirection:'row', alignSelf:'center' , alignItems:"space-between", marginTop: 20 }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#737373" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                  this.setState({title: ''});
                  this.setState({description: ''});
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "green" }}
                onPress={() => {
                  this.submit();

                  
                }}
              >
                <Text style={styles.textStyle}>Request</Text>
              </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          style={{ flex: 1, backgroundColor: "#f5f4f9" }}
          data={data}
          renderItem={() => (
            <>
              <UserBio
                user_name={this.state.user_name}
                user_userName={this.state.user_username}
                user_school={this.state.user_school}
              />

              <UserProfileHeader
                id={this.props.id}
                user_followers={this.state.user_followers}
                following={this.state.user_isfollowing}

              />
              <UserLineSeperator />

              <UserProfileGrid
                id={this.props.id}
                user_name={this.state.user_name}
                photo={this.state.user_photo}
              />
            </>
          )}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 35,
    width: 55,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  modalView: {
    marginTop: ("30%"),
    marginLeft: ("4%"),
    marginRight: ("4%"),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width - 250,
    marginHorizontal:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
loginFormTextInput2 : {
  height: 100,
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
})