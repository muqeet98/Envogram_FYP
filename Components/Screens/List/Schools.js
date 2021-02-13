import { Item } from 'native-base';
import React from 'react'
import { Component } from 'react';
import {View, Text, StyleSheet,AsyncStorage} from 'react-native'
import {TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import {Actions} from 'react-native-router-flux'
const data = [
    {id: '1', name: "IIUI"},
    {id: '2' , name: "NUST"},
    {id: '3' , name: "FAST"},
    {id: '4' , name: "NUML"},
    {id: '5' , name: "BIIT"},
  ];

export default class Schools extends Component {
constructor(){
    super();
    this.state = {
            school:'',
    }
}
UNSAFE_componentWillMount(){
    this.retriveData();
}
retriveData = async() =>{
    this.setState({school: await AsyncStorage.getItem('school')})
}




    Test({item}){
       
        return(
          <TouchableOpacity onPress={()=>Actions.SelectDepartment({schoolname: item.name})} >
          <View style={styles.postContainer} >
              <Text style={{fontSize:20}} >{item.name}</Text>
          </View>
          </TouchableOpacity>
        )
    }

    render(){
        if(this.state.school == 'Organization'){
    return (
        <View style={{flex:1, backgroundColor: "#f5f4f9"}}>
            <TouchableOpacity>
                <Text style={{color:"#4c98cf", marginLeft: 20, marginTop: 10}} >Schools</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                style={{marginTop: 1, marginStart: 1}}
                renderItem={this.Test}
                numColumns={1}
                indicatorStyle={"black"}
                showsVerticalScrollIndicator={true}
        
      />
        </View>
    )
        }
        else{
            return(
                <View style={{flex:1, backgroundColor: "#f5f4f9"}}>
                <TouchableOpacity>
                    <Text style={{color:"#4c98cf", marginLeft: 20, marginTop: 10}} >Not Allowed to Perform this action</Text>
                </TouchableOpacity>
            </View> 
            )
        }
        
}
}
const styles = StyleSheet.create({
    postContainer: {
        alignSelf:"center",
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: 50,
        width: 290,
        borderRadius: 20,
        marginTop: 20,
        justifyContent:"center",
        alignItems:"center",
      }
})
