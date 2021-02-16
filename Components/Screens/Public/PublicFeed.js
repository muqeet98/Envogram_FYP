import React,{Component} from 'react'
import { View, Text, StyleSheet,  SafeAreaView,Image, AsyncStorage, ToastAndroid,Dimensions ,Clipboard} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {FlatList} from 'react-native-gesture-handler';
import {url1} from '../../API/types';
import axios from 'axios';


export default class PublicFeed extends Component {
  constructor(){
    super();
    this.state = {
      token:'',
      token_type: '',
      dataSource:[]
    }
  }

  UNSAFE_componentWillMount(){
    this.getToken();

    
  }
  getToken = async() =>{
    this.setState({token:await AsyncStorage.getItem('token')});
    this.setState({token_type:await AsyncStorage.getItem('token_type')});
    this.loadPosts();
  }

  loadPosts(){
  if(this.state.token!='' && this.state.token_type!=''){
    axios({
      method: 'get',
      url: url1 +'Public',
      headers: {
        'Authorization':this.state.token_type+' '+this.state.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => {
       let temp=JSON.stringify(res.data);
        if(temp.includes('text')){
          this.setState({
            dataSource:res.data
          })
          console.log("Haiii", this.state.dataSource)
        }
        else{
          console.log(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    else{
      ToastAndroid.show("Empty Token",ToastAndroid.SHORT);
    }
  }


  Test = ({item}) => {
    return (
        <SafeAreaView style={{flex:1}} >
        <View style={{flex:1, backgroundColor:"#f5f4f9" }}>
        <View style={styles.postContainer}>
        <View style={{flexDirection:"row"}}>
        <Text style={{left:65,top:25}} >{item.name} </Text>
        {/* <Text style={{left:110,top:25,color:"grey"}} >10min ago </Text> */}
        </View>
    {/* <View style={styles.profileContainer} >
    <Image source={{ uri: 'data:image/png;base64,'+ item.photo }} style={{ width: 45, height: 45, borderRadius: 30 }} />
    </View> */}
    <Image source={{ uri: 'data:image/png;base64,'+ item.photo }} style={{ width: 45, height: 45, borderRadius: 30 }} />
        <View style={styles.innerContainer}>
    <Text onLongPress={() => {Clipboard.setString(item.text),
       ToastAndroid.show("Coppied",ToastAndroid.SHORT);  }} style={{textAlign:"justify", paddingLeft: 10, paddingRight: 10}} >{item.text}</Text>
        </View>
    </View>
    </View>
    </SafeAreaView>
    );
  }

 
  render(){
    return (
        <FlatList
        refreshing={true}
        data={this.state.dataSource}
        style={{marginTop: 1, marginStart: 1}}
        renderItem={this.Test}
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
        marginTop: 20
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