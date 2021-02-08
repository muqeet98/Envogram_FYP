import React from 'react';
import {View, Dimensions, TextInput, Text} from 'react-native';
import colors from '../../res/colors';

export default function RequestSearch() {
  return (
    <View>
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.textFaded2}
        style={{
          backgroundColor: "#f5f4f9",
          height: 40,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          fontWeight: 'bold',
          paddingStart: 10,
          fontSize: 16,
          color: 'white',
        }}
      />
    </View>
  );
}
