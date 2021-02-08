import React from 'react';
import {View, Image, Text} from 'react-native';
import DirectMessageSearch from './DirectMessageSearch';
import Title from './Title';
import MessagesList from './MessageList';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../res/colors';
import images from '../../res/images';
import { Actions } from 'react-native-router-flux';

const data = [{key: '1'}];

export default function DirectMessageScreen() {
  return (
    <>
      <FlatList
        style={{backgroundColor: '#fff', flex: 1}}
        data={data}
        renderItem={() => (
          <>
            <DirectMessageSearch />
            <Title />
            <MessagesList/>
          </>
        )}
      />
    
    </>
  );
}
