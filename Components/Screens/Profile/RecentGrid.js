import React, { Component } from 'react'
import { View, TextInput, StyleSheet , Text,AsyncStorage } from 'react-native'
import {Button} from 'react-native-elements'

export default class RecentGrid extends Component {
    constructor(){
        super();
        this.state={
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
    console.log(this.state);
    }   
    render() {
        return (
            <View style={{ backgroundColor: '#f5f4f9' }} >
                <View style={{ marginTop: 10 }}>
                    <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize="none"
                        placeholder={this.state.name}
                        placeholderTextColor="grey"
                    />
                    <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder={this.state.username}
                        placeholderTextColor="grey"
                    />
                    <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder={this.state.email}
                        placeholderTextColor="grey"
                    />
                    {/* <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize="none"
                        keyboardType='phone-pad'
                        placeholder={this.state.phone_number}
                        placeholderTextColor="grey"
                    /> */}
                    {
                     this.state.education != '' ? 
                    <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize="none"
                        keyboardType="default"
                        placeholder={this.state.education}
                        placeholderTextColor="grey"
                    />
                    : null
                    }
                    {this.state.work_history != '' ?
                    <TextInput style={styles.loginFormTextInput}
                        editable={false}
                        autoCapitalize='none'
                        keyboardType="default"
                        placeholder={this.state.work_history}
                        placeholderTextColor="grey"
                    />
                    :
                    null 
                }
                </View>


            </View>
        )
    }
}
const styles=StyleSheet.create({
    loginFormTextInput : {
        height: 43,
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