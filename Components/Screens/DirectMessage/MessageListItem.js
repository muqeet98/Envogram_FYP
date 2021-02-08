import React from 'react';
import {View, Image, Text, Vibration} from 'react-native';
import colors from '../../res/colors';
import images from '../../res/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
export default function MessageListItem({data}) {
  return (
    <TouchableOpacity onPress={()=>{Actions.Chat()}} >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginStart: 10,
          marginEnd: 10,
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: 'https://picsum.photos/600'}}
            style={{width: 60, height: 60, borderRadius: 70}}
          />
          <View style={{flexDirection: 'column', marginStart: 15}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}  >
              {data.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.textFaded2}}>{data.message}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity>
          <View>
          <Icon
              style={{width:25, height:25, marginTop: 10}}
              name='camera'
              type='simple-line-icon'
              color='black' />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
