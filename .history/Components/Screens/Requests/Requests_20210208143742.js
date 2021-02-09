import React from 'react';
import {View, Image, Text} from 'react-native';
import RequestSearch from './RequestSearch';
import RequestList from './RequestList';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../res/colors';
import images from '../../res/images';

const data = [{key: '1'}];

export default function Requests() {
  return (
    <>
      <FlatList
        style={{backgroundColor: '#fff', flex: 1}}
        data={data}
        renderItem={() => (
          <>
            <RequestSearch />
            <RequestList />
          </>
        )}
      />
      
    </>
  );
}






// import React , { Component } from 'react';
// import {View, Image, Text, AsyncStorage} from 'react-native';
// import RequestSearch from './RequestSearch';
// import RequestList from './RequestList';
// import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
// import { Icon } from 'react-native-elements'
// import colors from '../../res/colors';
// import images from '../../res/images';

// // const data = [{key: '1'}];
// export default class Requests extends Component{

// constructor(){
//   super();
//   this.state ={
//     dataArr: [],
//     token: '',
//     token_type: ''
//   }
// }

// retriveData = async () => {
  
//   console.log(this.state.token)
//   console.log(this.state.token_type)
// }

// renderItemsFun = ({item}) => {
//   <View
//   style={{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginStart: 10,
//     marginEnd: 10,
//     marginTop: 15,
//   }}>
    
//   <View style={{flexDirection: 'row'}}>
//     <TouchableOpacity>
//     <Image
//       source={{uri: 'https://picsum.photos/600'}}
//       style={{width: 60, height: 60, borderRadius: 70}}
//     />
//     </TouchableOpacity>
//     <View style={{flexDirection: 'column', marginStart: 15, marginTop: 20}}>
//       <Text style={{color: 'black', fontWeight: 'bold'}}>
//         {item.title}
//       </Text>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        
        
//       </View>
//     </View>
//   </View>

  
//     <View style={{flexDirection:"row"}}>
//     <TouchableOpacity>
//     <View>
//     <Icon
//         style={{width:25, height:25, marginTop: 20, marginEnd: 20}}
//         name='check-circle'
//         type='material-community'
//         color='green' />
//     </View>
//     </TouchableOpacity>
//     <TouchableOpacity>
//     <View>
//     <Icon
//         style={{width:25, height:25, marginTop: 20}}
//         name='circle-with-cross'
//         type='entypo'
//         color='red' />
//     </View>
//     </TouchableOpacity>
//     </View>
  
// </View>
// }


// webCall = async () => {
//   this.setState({ token: await AsyncStorage.getItem('token')})
//   this.setState({ token_type: await AsyncStorage.getItem('token_type')})

//   fetch(base_url+'/api/user/chat-request', {
//     method: "get",
//     headers: {
//       Authorization: this.state.token_type + ' ' + this.state.token ,
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//   },
//   }).then(res => res.json())
//     .then(data => {
//       // console.log("Hai Data", data)
//       this.setState({ dataArr: data})
//       console.log('Data hai' + JSON.stringify(this.state.dataArr))
//     })

// }

//   componentDidMount(){

//     this.webCall();

//   }


// render(){
//   console.log(this.state.dataArr.lengthz)
// return (
// <View>
//    <RequestSearch />
//    <FlatList
//     style={{backgroundColor: '#fff', flex: 1}}
//     data={this.state.dataArr}
//     renderItem={this.renderItemsFun}
//     keyExtractor={item => item.id }
//   />
// </View>
// );
//     }
// }
