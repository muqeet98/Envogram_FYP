import React,{useState} from 'react'
import {Scene, Router, Actions, Lightbox, Modal} from 'react-native-router-flux'

import {View, StyleSheet, Dimensions , TouchableOpacity , TextInput, Alert,LogBox} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../Components/Screens/Login'
import SignUp from '../Components/Screens/SignUp'
import SignUp2 from '../Components/Screens/SignUp2'
import Feed from '../Components/Screens/Feed'
import Search from '../Components/Screens/Search'
import Add from '../Components/Screens/Add'
import List from '../Components/Screens/List'
import DirectMessage from '../Components/Screens/DirectMessage/DirectMessageScreen';
import Requests from '../Components/Screens/Requests/Requests'
import ProfileScreen from '../Components/Screens/Profile/ProfileScreen'
import SelectDepartment from '../Components/Screens/List/SelectDepartment'
import UserProfileScreen from '../Components/Screens/UserProfile/UserProfileScreen'
import CompleteProfile from '../Components/Screens/CompleteProfile'
import EditProfile from '../Components/Screens/Profile/EditProfile'
import Chats from '../Components/Screens/Chat/Chats'
import Chat1 from '../Components/Screens/Chat1'
import AlertModel from '../Components/Screens/UserProfile/AlertModel';
LogBox.ignoreAllLogs();
// const [modalVisible, setModalVisible] = useState(false);
const HomeIcon =({focused}) => {
    return (
    
        <Icon style={{color: focused ? '#4c98cf' :'grey'}}  name="home" size={26} color="grey"  />
     
    )
}
const SearchIcon =({focused}) => {
    return (
     
     <Icon style={{color: focused ? '#4c98cf' :'grey'}} name="magnify" size={26} color="grey"  />
     
    )
}
const AddIcon =({focused}) => {
    return (
     
     <Icon style={{color: focused ? '#4c98cf' :'grey'}} name="plus-box" size={26} color="grey"  />
     
    )
}
const ListIcon =({focused}) => {
    return (
     
     <Icon style={{color: focused ? '#4c98cf' :'grey'}} name="view-list" size={26} color="grey"  />
     
    )
}
const ProfileIcon =({focused}) => {
    return (
     
     <Icon style={{color: focused ? '#4c98cf' :'grey'}}  name="account-circle" size={26} color="grey"  />
     
    )
}

const AlertIcon =({focused}) => {
    return (
     
     <Icon onPress={() => {
         return(
            console.log("Hai")
         )
     } } style={{marginRight: 20 ,color: focused ? '#4c98cf' :'grey'}}  name="alert-circle-outline" size={26} color="grey"  />
     
    )
}

const InboxIcon =({focused}) => {
    return (
     <Icon onPress={()=>Actions.DirectMessage()} name="inbox" size={26} color="grey" style={{marginRight: 30, color: focused ? '#4c98cf' :'grey'}} />   
    )
}
const SearchBar =()=> {
    return(
        <View style={{marginHorizontal: 5, marginVertical: 10, flexDirection:"row" }}>
            
        <TextInput
          style={{
            backgroundColor: "#f5f4f9",
            height: 35,
            width: Dimensions.get('screen').width - 30,
            fontWeight: 'bold',
            borderRadius: 10,
            paddingStart: 20,
            fontSize: 16,
            color: 'white',
          }}
          placeholder="Search"
          placeholderTextColor={"#999"}
        />
         <Icon style={{right:10, position:"absolute",alignSelf:"center"}}  name="magnify" size={20} color="grey"/>
      </View>
    )
}
export default function AppRouting() {
    return (

        <Router >
            <Scene key={'root'} headerLayoutPreset="center" >
                <Scene
                key={'tabBar'}
                hideNavBar
                tabs
                tabBarStyle={{backgroundColor:"#FFFFFF"}}
                activeTintColor={"#000"}
                  
                >
                    <Scene  renderRightButton={InboxIcon} key={'Feed'} component={Feed} title="News Feed"  tabBarLabel="Home" icon={HomeIcon} />
                    <Scene  lazy  component={Search} key={"Search"} title="Search" icon={SearchIcon} />
                    
                    <Scene  component={Add} key={"Add"} title="Add" icon={AddIcon} />
                    
                    <Scene   component={List} key={"List"} title="List" icon={ListIcon}/>
                    
                    <Scene component={ProfileScreen} key={"ProfileScreen"} title="Profile" icon={ProfileIcon} />
                    
                </Scene>
                    <Scene initial  hideNavBar component={Login} key={"Login"} title="Login"/>
                    <Scene hideNavBar component={SignUp} key={"SignUp"} title="Step1Signup"/>
                    <Scene hideNavBar component={SignUp2} key={"SignUp2"} title="Step2Signup"/>
                    <Scene back={true} component={DirectMessage} key={"DirectMessage"} title="Inbox"/>
                    <Scene back={true} component={Chats} key={"Chat"} title="Chats"/>
                    <Scene back={true} component={Chat1} key={"Chat1"} title="Chat1"/>
                    <Scene back={true} lazy component={Requests} key={"Requests"} title="Requests"/>
                    <Scene hideNavBar back={true} component={SelectDepartment} key={"SelectDepartment"} title="Select Department"/>

                    <Scene navigationBarStyle={{elevation:0}} titleStyle={{
                        fontSize: 15 
                    }}  back={false} hideNavBar component={UserProfileScreen} key={"UserProfileScreen"} renderRightButton={AlertIcon} title="User Profile" />


                    <Scene  component={CompleteProfile} key={"CompleteProfile"} title="Complete your Profile"/>
                    <Scene back={true} titleStyle={{
                        fontSize: 13
                    }} component={EditProfile} key={"EditProfile"} title="Edit Profile"/>
                {/* <Scene  hideNavBar  headerForceInset={{ top: 'never' }}  component={MapScreen} key={"PassengerDashboard"} title="MapScreen"/> */} 
            </Scene>
        </Router>
    )
}
const styles = StyleSheet.create({
    itemIcon: {
        width: 35,
        color: 'grey'
    },
    itemsText: {
        marginLeft: 20,
        fontSize: 15,
        alignSelf: 'center',
        color: 'grey'
    }
})