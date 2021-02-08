import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'
const Logo = () => {
    return (
        <Animatable.View animation="zoomIn" iterationCount={1}>
            <Image style={styles.logo} resizeMode={'contain'} source={require('../../../assets/logo.png')}></Image>
        </Animatable.View>
    )
}

export default Logo

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      justifyContent:"center",
      width: 150,
      height: 150,
      
    },

  });