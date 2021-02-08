import React from 'react';
import {Image, View} from 'react-native';
import images from '../../res/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import ProfileGrid from './ProfileGrid'
import RecentGrid from './RecentGrid'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function gridIcon() {
  return (
      
    <NavigationContainer >
    <Tab.Navigator
     style={{backgroundColor:"#f5f4f9"}}
     tabBarOptions={{
        style: {height: 50, backgroundColor:"#f5f4f9", elevation:0},
        showIcon: true,
        showLabel: false
    }}
    
     >
      <Tab.Screen  name="Profile" component={ProfileGrid}  options={{ tabBarLabel: 'Profile', tabBarIcon:({tintColor,focused})=>( <Icon
              
              name='grid'
              type='material-community'
              color='#4c98cf' />) }}  />
      <Tab.Screen name="Recents" component={RecentGrid} options={{ tabBarLabel: 'Recent', tabBarIcon:({tintColor,focused})=>( <Icon
              
              name='back-in-time'
              type='entypo'
              color='#4c98cf' />) }} />
    </Tab.Navigator>

    </NavigationContainer>
    
  );
}

export default gridIcon



