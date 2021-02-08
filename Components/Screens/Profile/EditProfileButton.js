import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../res/colors';
import {navigation} from '@react-navigation/native'
import { Actions } from 'react-native-router-flux'


export default class EditProfileButton extends Component {
  constructor(){
    super();
  }
  editprofile(){
    const navigation = this.props;
    navigation.navigate('EditProfile')
    
  }
  render() {
    return (
      <TouchableOpacity>
        <View style={{ marginTop: 0 }}>
          <View
            style={{
              alignSelf: 'flex-end',
              flex: 1,
              height: 37,
              width: 61,
              borderRadius: 5,
              marginStart: 10,
              marginEnd: 10,
              backgroundColor: '#4c98cf',
              justifyContent: 'center',
              borderColor: '#4c98cf',
              borderWidth: 1,
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'white' }}
                onPress={() => this.editprofile()}
              >Edit</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
