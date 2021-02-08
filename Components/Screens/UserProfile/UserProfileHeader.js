import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, AsyncStorage} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'
import axios from 'axios';
import {Follow_Unfollow} from '../../API/types'
import {userProfile} from '../../API/types'
import { Actions } from 'react-native-gifted-chat';
import Modal from 'react-native-modal'
import DropDownPicker from 'react-native-dropdown-picker'
import { Textarea } from 'native-base'

export default class UserProfileHeader extends Component {
 
  constructor(){
    super();
    this.state = {
      token:'',
      token_type:'',
      user_id:'',
      isfollowing:'',
      followers:'',
      following:'',
    }
  }
  UNSAFE_componentWillMount(){
    this.retriveData();
  }
  retriveData = async() =>{
      this.setState({token: await AsyncStorage.getItem('token')})
      this.setState({token_type: await AsyncStorage.getItem('token_type')})
      this.setState({user_id:this.props.id})
      this.getFollowers()

  }

  getFollowers(){
    axios({
      method: 'get',
      url: userProfile + this.props.id,
      headers: {
          'Authorization' :this.state.token_type+' '+this.state.token ,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
        if(temp.includes('name')){
          this.setState({
            isfollowing: res.data.following,
            followers: res.data.followers,
          })
          if(this.state.isfollowing == true){
            this.setState({following:"Unfollow"})
          }
          else if(this.state.isfollowing == false){
            this.setState({following:"Follow"})
          }
          
        }

        else{
            console.warn("API RESPONSE EMPTY")
        }
      })
      .catch(err => {
        console.log(err);
      })
    }


  Follow_Unfollow(){
    let data = {};
    data.user_id = this.state.user_id;
    axios({
      method: 'post',
      url: Follow_Unfollow,
      headers: {
          'Authorization' :this.state.token_type+' '+this.state.token ,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data:data
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
        if(temp.includes('User followed successfully')){
          this.setState({following:"Unfollow"})
          this.getFollowers();
          this.forceUpdate();
        }
        else if(temp.includes('unfollow_user_id')){
          this.setState({following:"Follow"})
          this.getFollowers()
          this.forceUpdate()
        }
        else{
            console.warn("API RESPONSE EMPTY")
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.container2}>
          <View style={Styles.container3}>
            <TouchableOpacity>
              <Text style={Styles.numberContainer}>{this.state.followers}</Text>
              <Text style={Styles.text}>Followers</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.container3}>
            <Button
              onPress = {()=> this.Follow_Unfollow()}
              buttonStyle={[Styles.loginButton]}
              title={this.state.following} />
          </View>
          <View style={Styles.container3}>
            <Button
              titleStyle={{ color: "#000" }}
              buttonStyle={[Styles.messageButton]}
              title="Message"
              onPress={()=>Actions.Chat1()}
              />
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
    marginTop: 40,
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
  loginButton : {
    backgroundColor: '#4c98cf',
    borderRadius: 6,
    height: 37,
    width: 108,
  },
  messageButton :{
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 37,
    width: 108,
  },
  
});

const styles=StyleSheet.create({
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
  width: 290,
  borderRadius: 20,
  marginTop: 20
},
innerContainer: {
  justifyContent:"center",
  alignSelf:"center",
  flexDirection: 'column',
  backgroundColor: '#f5f4f9',
  position:"absolute",
  height: 100,
  width: 250,
  borderRadius: 20,
  bottom:10
},
loginFormTextInput : {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#4c98cf',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  width: 120
  
},
})