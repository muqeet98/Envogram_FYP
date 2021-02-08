import React from 'react';
import {View, Image, Text, Vibration} from 'react-native';
import { Icon } from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MessageListItem({data}) {
  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginStart: 10,
      marginEnd: 10,
      marginTop: 15,
    }}>
      
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
      <Image
        source={{uri: 'https://picsum.photos/600'}}
        style={{width: 60, height: 60, borderRadius: 70}}
      />
      </TouchableOpacity>
      <View style={{flexDirection: 'column', marginStart: 15, marginTop: 20}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          {data.title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          
        </View>
      </View>
    </View>

    
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity>
      <View>
      <Icon
          style={{width:25, height:25, marginTop: 20, marginEnd: 20}}
          name='check-circle'
          type='material-community'
          color='green' />
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View>
      <Icon
          style={{width:25, height:25, marginTop: 20}}
          name='circle-with-cross'
          type='entypo'
          color='red' />
      </View>
      </TouchableOpacity>
      </View>
    
  </View>
  );
}
