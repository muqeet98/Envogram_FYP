import React, { Component } from 'react'
import { View, Text, StyleSheet , TextInput, TouchableOpacity,Image, Dimensions, AsyncStorage, ToastAndroid,FlatList} from 'react-native'
import {Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux'
// import { FlatList } from 'react-native-gesture-handler'
import {userByName,userProfile} from '../API/types'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const data = [
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
    {key: '6'},
    {key: '7'},
    {key: '8'},
    {key: '9'},
    {key: '10'},
    {key: '11'},
    {key: '12'},
    {key: '13'},
    {key: '14'},
  ];
export default class Search extends Component{
constructor(props){
    super(props);
    this.state = {
        token:'',
        token_type:'',
        dataSource:[],
        searchText:'',
        chattedcon: ''
        
    }
}


UNSAFE_componentWillMount(){
    this.retriveData();
}
retriveData = async() =>{
    this.setState({token: await AsyncStorage.getItem('token')})
    this.setState({token_type: await AsyncStorage.getItem('token_type')})
}
searchByName(){
    if(this.state.searchText != null){
    axios({
        method: 'get',
        url: userByName + this.state.searchText,
        headers: {
            'Authorization':this.state.token_type+' '+this.state.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => {
         let temp=JSON.stringify(res.data.data);
          if(temp.includes('name')){
             console.log(res.data.data)
            this.setState(
              {
                dataSource: res.data.data
            
            })
          }
          else{
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    else{
        
    }
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
    //  console.log("HAhaha", res.data);
      if(temp.includes('name')){
        AsyncStorage.setItem('token', res.data.chattedAlready);
        
      }

      else{
          console.warn("API RESPONSE EMPTY")
      }
    })
    .catch(err => {
      console.log(err);
    })
  }


    renderList =  ({item}) => {
      console.log("hello")
        return (
            <View>
            <View style={{flexDirection:"row", flex:1}}>
                    {/* <View 
                      
                    style={styles.profileContainer}/> */}
                    <Image source={{ uri: 'data:image/jpeg;base64,' + item.photo }} style={{ width: 60, height: 60, borderRadius: 30, borderColor: "#000", borderWidth:2 }} />
                    <View >
                         <Text 
                        //  onLongPress = {()=> ToastAndroid.show(item.name,ToastAndroid.SHORT)}
                         onPress ={()=>{
                          axios({
                            method: 'get',
                            url: userProfile + item.id,
                            headers: {
                                'Authorization' :this.state.token_type+' '+this.state.token ,
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                          })
                            .then(res => {
                             let temp=JSON.stringify(res.data);
                              //  AsyncStorage.setItem('chated', res.data.chattedAlready);
                                 console.log("HAhahahhhhh", res.data.chattedAlready);
                                this.setState({chattedcon: res.data.chattedAlready})
                                
                                Actions.UserProfileScreen({id:item.id, chated: this.state.chattedcon }), this.setState({dataSource: []})
                    
                            })
                            .catch(err => {
                              console.log(err);
                            })

                          
                          // Actions.UserProfileScreen({id:item.id, chated: this.state.chattedcon}), this.setState({dataSource: []})
                        }}
                         style={styles.text}> {item.name}</Text>
                         {/* <Text>{item.id}</Text> */}
                    </View>
  
                </View>
                </View>
                
        );
      } 



      // getKey(key){
      //   alert("Submitted")
      // }

    render() {
        return (

            <View style={{ flex: 1 }}>

                <View style={{ marginHorizontal: 5, marginVertical: 10, flexDirection: "row" }}>

                    <TextInput
                        style={{
                            backgroundColor: "#f5f4f9",
                            height: 35,
                            width: Dimensions.get('screen').width - 10,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            paddingStart: 20,
                            fontSize: 16,
                            color: 'black',
                        }}
                        returnKeyType = 'search'
                        onSubmitEditing = {()=>this.searchByName()}
                        onChangeText = {(text) => this.setState({searchText:text})}
                        placeholder="Search"
                        placeholderTextColor={"#999"}
                    />
                    <Icon style={{ right: 10, position: "absolute", alignSelf: "center" }} name="magnify" size={20} color="#000" />
                </View>
                <FlatList
                    data={this.state.dataSource}
                    style={{ marginTop: 1, marginStart: 1 }}
                    renderItem={this.renderList}
                    numColumns={1}
                    // indicatorStyle={"black"}
                    showsVerticalScrollIndicator={true}

                />
            </View>

        )
    }
}
const styles=StyleSheet.create ({
    textInput: {
      marginTop: 10,
      textAlign:"left",
      marginRight:15,
      color:"#4c98cf",
      fontSize:18,

      
      
    },text:{
        flex:4,
        fontSize:18, 
        marginTop:20,
        width:260,
        position:"relative",
    },
    profileContainer: {
        width: 45,
        height: 45,
        borderRadius:50,
        backgroundColor:"#000",
        marginLeft: 20,
        marginTop: 10,
        position:"relative",


    },
    loginButton : {
        flex:1,
        backgroundColor: '#4c98cf',
        borderRadius: 5,
        height: 28,
        position:"relative",
        marginEnd:10,
        
    
      },
})




// import React, { Component } from 'react'
// import { View, Text, StyleSheet , TextInput, TouchableOpacity, Dimensions, AsyncStorage, ToastAndroid,FlatList} from 'react-native'
// import {Button} from 'react-native-elements';
// import { Actions } from 'react-native-router-flux'
// // import { FlatList } from 'react-native-gesture-handler'
// import {userByName} from '../API/types'
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// const data = [
//     {key: '1'},
//     {key: '2'},
//     {key: '3'},
//     {key: '4'},
//     {key: '5'},
//     {key: '6'},
//     {key: '7'},
//     {key: '8'},
//     {key: '9'},
//     {key: '10'},
//     {key: '11'},
//     {key: '12'},
//     {key: '13'},
//     {key: '14'},
//   ];
// export default class Search extends Component{
// constructor(props){
//     super(props);
//     this.state = {
//         token:'',
//         token_type:'',
//         dataSource:[],
//         searchText:'',
//     }
// }


// UNSAFE_componentWillMount(){
//     this.retriveData();
// }
// retriveData = async() =>{
//     this.setState({token: await AsyncStorage.getItem('token')})
//     this.setState({token_type: await AsyncStorage.getItem('token_type')})
// }
// searchByName(){
//     if(this.state.searchText != null){
//     axios({
//         method: 'get',
//         url: userByName + this.state.searchText,
//         headers: {
//             'Authorization':this.state.token_type+' '+this.state.token,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       })
//         .then(res => {
//          let temp=JSON.stringify(res.data);
//           if(temp.includes('name')){
//             this.setState({dataSource: res.data.data})
//           }
//           else{
//             console.log(res.data);
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         })
//     }
//     else{
        
//     }
// }



//     renderList =  ({item}) => {
//         return (
            
//             <View style={{flexDirection:"row", flex:1}}>
//                     <View 
//                     onTouchEnd = {()=>Actions.UserProfileScreen({id:item.id})}
//                     style={styles.profileContainer}/>
//                     <View >
//                          <Text 
//                          onLongPress = {()=> ToastAndroid.show("OK",ToastAndroid.SHORT)}
//                          onPress ={()=>{Actions.UserProfileScreen({id:item.id}), this.setState({dataSource: []})}}
//                          style={styles.text}>{item.name}</Text>
//                     </View>
//                     <View style={styles.loginButton} >
//                     <Button title="Message" />
//                     </View>
//                 </View>
                
//         );
//       } 

//       getKey(key){
//         alert("Submitted")
//       }

//     render() {
//         return (

//             <View style={{ flex: 1 }}>

//                 <View style={{ marginHorizontal: 5, marginVertical: 10, flexDirection: "row" }}>

//                     <TextInput
//                         style={{
//                             backgroundColor: "#f5f4f9",
//                             height: 35,
//                             width: Dimensions.get('screen').width - 10,
//                             fontWeight: 'bold',
//                             borderRadius: 10,
//                             paddingStart: 20,
//                             fontSize: 16,
//                             color: 'black',
//                         }}
//                         returnKeyType = 'search'
//                         onSubmitEditing = {()=>this.searchByName()}
//                         onChangeText = {(text) => this.setState({searchText:text})}
//                         placeholder="Search"
//                         placeholderTextColor={"#999"}
//                     />
//                     <Icon style={{ right: 10, position: "absolute", alignSelf: "center" }} name="magnify" size={20} color="#000" />
//                 </View>
//                 <FlatList
//                     data={this.state.dataSource}
//                     style={{ marginTop: 1, marginStart: 1 }}
//                     // renderItem={this.renderList}
//                     renderItem={()=> this.renderList()}
//                     numColumns={1}
//                     indicatorStyle={"black"}
//                     showsVerticalScrollIndicator={true}

//                 />
//             </View>

//         )
//     }
// }
// const styles=StyleSheet.create ({
//     textInput: {
//       marginTop: 10,
//       textAlign:"left",
//       marginRight:15,
//       color:"#4c98cf",
//       fontSize:18,

      
      
//     },text:{
//         flex:4,
//         fontSize:18, 
//         marginTop:20,
//         width:260,
//         position:"relative",
//     },
//     profileContainer: {
//         width: 45,
//         height: 45,
//         borderRadius:50,
//         backgroundColor:"#000",
//         marginLeft: 20,
//         marginTop: 10,
//         position:"relative",


//     },
//     loginButton : {
//         flex:1,
//         backgroundColor: '#4c98cf',
//         borderRadius: 5,
//         height: 28,
//         position:"relative",
//         marginEnd:10,
        
    
//       },
// })