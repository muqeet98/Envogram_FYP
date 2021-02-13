import * as React from 'react';
import {StyleSheet,View, AsyncStorage, ToastAndroid} from 'react-native'
import {Dimensions} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DepartmentFeed from '../Screens/Department/DepartmentFeed'
import PublicFeed from '../Screens/Public/PublicFeed'
import SchoolFeed from '../Screens/School/SchoolFeed'
import {Actions} from 'react-native-router-flux';
import Login from '../Screens/Login';
const Tab = createMaterialTopTabNavigator();

export default class Feed extends Login {
  constructor(){
    super();
  }

//     componentDidMount() {
//     this._unsubscribe = navigation.addListener('focus', () => {
//       // do something
//     });
//   }
//  componentWillMount(){
//   didBlurSubscription.remove();
//  }

  render(){
  return (

    <NavigationContainer  >
    <Tab.Navigator
     style={{backgroundColor:"#f5f4f9"}} 
     tabBarOptions={{
        style: { marginTop: 20, borderRadius: 10, width: Dimensions.get('screen').width-25, alignSelf:'center', height: 50,}
    }} >
      <Tab.Screen name="Public" component={PublicFeed} />
      <Tab.Screen name="School" component={SchoolFeed} />
      <Tab.Screen name="Department" component={DepartmentFeed} />

    </Tab.Navigator>
    </NavigationContainer>
    
    );
  }
}

const styles = StyleSheet.create({
  loginButton : {
    backgroundColor: '#737373',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
})