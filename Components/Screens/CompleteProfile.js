import { Assets } from '@react-navigation/stack'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { View, TextInput, StyleSheet , Text, requireNativeComponent, AsyncStorage } from 'react-native'
import {Button} from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Actions } from 'react-native-gifted-chat'
import {urlUpdateProfile} from '../API/types'
export default class CompleteProfile extends Component {
    constructor(){
        super();
        this.state = {
                name:'',
                father_name:'',
                email:'',
                username:'',
                registration_no:'',
                school:'',
                department:'',
                batch:'',
                phone_number:'',
                education:'',
                work_history:'',
                token:'',
                token_type:'',
        }
    }

    UNSAFE_componentWillMount(){
        this.retriveData();
    }
    retriveData = async() =>{
        this.setState({
        name: await AsyncStorage.getItem('name'),
        email: await AsyncStorage.getItem('email'),
        username: await AsyncStorage.getItem('username'),
        father_name: await AsyncStorage.getItem('father_name'),
        department: await AsyncStorage.getItem('department'),
        registration_no: await AsyncStorage.getItem('regNo'),
        batch: await AsyncStorage.getItem('batch'),
        school: await AsyncStorage.getItem('school'),
        token: await AsyncStorage.getItem('token'),
        token_type: await AsyncStorage.getItem('token_type'),
    })
    } 
    storeData = async(data,firstLogin) =>{
        try{
          AsyncStorage.setItem('name',data.user.name)
          AsyncStorage.setItem('id',JSON.stringify(data.user.id))
          AsyncStorage.getItem('firstLogin',firstLogin)
          AsyncStorage.setItem('father_name',data.user.father_name)
          AsyncStorage.setItem('regNo',data.user.registration_no)
          AsyncStorage.setItem('school',data.user.school)
          AsyncStorage.setItem('department',data.user.department)
          AsyncStorage.setItem('batch',data.user.betch)
          AsyncStorage.setItem('phone_number',data.user.phone_number)
          AsyncStorage.setItem('education',data.user.education)
          AsyncStorage.setItem('work_history',data.user.work_history)
          AsyncStorage.setItem('username',data.user.username)
          AsyncStorage.setItem('email',data.user.email)
          AsyncStorage.setItem('photo',data.user.photo)
          AsyncStorage.setItem('role',data.user.role)
          AsyncStorage.setItem('status',data.user.status)
          AsyncStorage.setItem('token',data.access_token)
          AsyncStorage.setItem('token_type',data.token_type)
        }
      catch(err){
        ToastAndroid.show(err,ToastAndroid.SHORT);
      }
      }

      UpdateProfile(){
        const firstLogin = false;
        axios({
            method: 'post',
            url: urlUpdateProfile,
            headers: {
                'Authorization':this.state.token_type+' '+this.state.token,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            data: this.state
          })
            .then(res => {
             let temp=JSON.stringify(res.data);
              if(temp.includes('Profile updated successfully')){
                this.storeData(res.data,firstLogin);
                Actions.Feed();
              }
            })
            .catch(err => {
              let check = JSON.stringify(err); 
              if(check.includes('status code 401')){
                ToastAndroid.show("Invalid Username/Password", ToastAndroid.SHORT);
              }
              else if(check.includes('status code 500')){
                ToastAndroid.show("Connection Timedout", ToastAndroid.SHORT);
              }
              else if(check.includes('Network Error')){
                ToastAndroid.show("Network Error\nPlease Check Your Internet connection and try again later", ToastAndroid.SHORT);
              }
              else{
                console.log(err);
              }
            })
    }
    skip = async()=>{
      AsyncStorage.setItem('firstLogin',false);
      Actions.Feed();
    }
    render(){
            return (
        <View style={{flex:1, backgroundColor: '#f5f4f9'}} >
            
            <View style={{backgroundColor: '#737373', height:400, borderBottomStartRadius:20, borderBottomEndRadius:20}}>
                <View style={{backgroundColor:"#000",width: 104,height: 104, borderRadius:50, alignSelf:"center", marginTop: 30, borderWidth:3, borderColor:"#fff"}} />
                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.loginFormTextInput}
                            autoCapitalize="none"
                            keyboardType='phone-pad'
                            placeholder="Phone Number"
                            placeholderTextColor="grey"
                            onChangeText = {(text)=>this.setState({phone_number:text})}
                        />
                        <TextInput style={styles.loginFormTextInput}
                            autoCapitalize="none"
                            keyboardType="default"
                            placeholder="Education"
                            placeholderTextColor="grey"
                            onChangeText ={(text)=>this.setState({education:text})}
                        />
                        <TextInput style={styles.loginFormTextInput}
                            autoCapitalize='none'
                            keyboardType="default"
                            placeholder="Work History"
                            placeholderTextColor="grey"
                            onChangeText = {(text)=> this.setState({work_history:text})}
                        />
                    </View>    
            </View>
            <Button               
          buttonStyle={[styles.loginButton]}
          title="Save"
          onPress ={()=>this.UpdateProfile()}/>
            <TouchableOpacity style={{alignSelf:"center"}}
            onPress={()=>this.skip()}
            >
                    <Text style={{color:"#737373", fontSize:15}} >Skip</Text>
            </TouchableOpacity>
        </View>
    )
}
}
const styles=StyleSheet.create({
    loginFormTextInput : {
        height: 50,
        fontSize: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton : {
        backgroundColor: '#737373',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        width:112,
        alignSelf:"center"
      },
})