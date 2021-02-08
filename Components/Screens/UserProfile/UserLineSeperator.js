import React from 'react';
import {View} from 'react-native';

export default function UserLineSeperator() {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        height: 1,
        justifyContent: 'center',
        marginTop: 30,
        width:300,
        alignSelf:"center"
      }}></View>
  );
}
