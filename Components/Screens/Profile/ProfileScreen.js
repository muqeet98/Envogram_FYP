import React,{Component} from 'react';
import {StyleSheet,AsyncStorage,ToastAndroid, BackHandler} from 'react-native';
import palette from '../../res/palette';
import ProfileHeader from './ProfileHeader';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import UserBio from './UserBio';
import EditProfileButton from './EditProfileButton';
import axios from 'axios'
import {url} from '../../API/types'
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../res/colors';
import GridIcon from './gridIcon';
import {Icon, Button} from 'react-native-elements'
import RNRestart from 'react-native-restart';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Actions } from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation';
import { HeaderBackButton } from '@react-navigation/stack';
const data = [{key: '1'}];

export default class ProfileScreen extends Component {
  constructor(){
    super();
    this.state = {
      token:'',
      token_type:'',
    }

  }

  componentDidMount(){
    this.getToken();
  }

  getToken = async () =>{
    this.setState({token: await AsyncStorage.getItem('token')})
    this.setState({token_type: await AsyncStorage.getItem('token_type')})
  }
  removeData(){
    AsyncStorage.removeItem('name')
    AsyncStorage.removeItem('father_name')
    AsyncStorage.removeItem('regNo')
    AsyncStorage.removeItem('school')
    AsyncStorage.removeItem('department')
    AsyncStorage.removeItem('batch')
    AsyncStorage.removeItem('phone_number')
    AsyncStorage.removeItem('education')
    AsyncStorage.removeItem('work_history')
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('photo')
    AsyncStorage.removeItem('role')
    AsyncStorage.removeItem('status')
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('token_type')
  }
  logout(){
    axios({
      method: 'get',
      url: url +'logout',
      headers: {
        'Authorization': this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
        if(temp.includes('message')){
          AsyncStorage.clear();
          this.removeData();
          Actions.Login();
        }
        else{
          console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: "#f5f4f9" }}
        data={data}
        renderItem={() => (
          <>
            <Button
              titleStyle={{ fontSize: 12, color: "#000" }}
              buttonStyle={[styles.loginButton]}
              title="Logout" 
              onPress = {()=> this.logout()}
              />
            <UserBio />
            <ProfileHeader />
            <LineSeperator />
            <GridIcon />
          </>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  loginButton : {
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 35,
    width: 55,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    alignSelf:"flex-end",
  }
})